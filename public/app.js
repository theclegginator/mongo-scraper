$(document).ready(function(){
  // pull the articles from the database. This can be done as soon as the page loads.
  loadArticles();

  function loadArticles() {
    $("#articles").empty();
    $.getJSON("/articles", function(data) {
      // For each one
      for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").prepend(`
        <div data-id="${data[i]._id}" style="margin-bottom:30px;">
          <h3>${data[i].title}</h3>
          <p>${data[i].summary}</p>
          <p><a href="${data[i].link}">Read Article</a></p>
          <button type="button" class="addNote btn btn-primary" style="margin-right: 10px;">Add a Note</button>
          <button type="button" class="viewNote btn btn-success">View Notes</button>
        </div>
        <hr>
        `);
      }
    });
  }

  $("#scrapeButton").on("click", function () {
    // perform a new data scrape whenever the button is clicked by a user
    $.ajax({
      method: "GET",
      url: "/scrape",
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        loadArticles();
      });
    
  })

// When the user clicks the view note section
$(document).on("click", ".viewNote", function() {
  // get the mongo ID for the item
  let thisId = $(this).parent().attr("data-id");
  refreshNotes(thisId);
});

function refreshNotes (thisId) {
  let noNotes = false;
  $("#notesContent").empty();
  $("#notesModal").modal();
  
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/notes/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      if (data === undefined || data.length == 0) {
        noNotes = true;
        $("#notesContent").append("<p style='color: red'>No notes exist for this article. Feel free to add some!</p>");
        // if API call returns no results, the article does not have any existing notes
      }
      // if there were notes in the API call, create a section in the modal for each note with a delete button
      if (!noNotes) {
        for (let i = 0; i < data.length; i++) {
          $("#notesContent").append(`
          <div data-id="${data[i]._id}" data-article-id="${data[i].articleId}">
            <h4>${data[i].title}</h4>
            <p>${data[i].body}</p>
            <button type="button" class="deleteNote btn btn-danger">Delete Note</button>
            <hr>
          </div>
          `)
        }
      }
    });
}

// Delete note event
$(document).on("click", ".deleteNote", function() {
  let thisId = $(this).parent().attr("data-id");
  let thisArticleId = $(this).parent().attr("data-article-id");
  $.ajax({
    method: "POST",
    url: "/notes/delete/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      // refresh the notes list after deleting
      refreshNotes(thisArticleId);
    })
});


// when the add note button is clicked, build out a small form in the modal
$(document).on("click", ".addNote", function() {
  // Empty the notes from the note section
  $("#notesContent").empty();
  $("#notesModal").modal();
  // Save the id from the p tag
  var articleId = $(this).parent().attr("data-id");
  $("#notesContent").append(`
    <div>
    <h3>Add a new Note</h3>
    <input id="titleinput" name='title' class="form-control" type="text" placeholder="Note Title">
    <div class="form-group" style="padding-top: 20px";>
      <textarea id='bodyinput' name='body' class="form-control" rows="3" placeholder="Note Content"></textarea>
    </div> 
    <button type="button" class="btn btn-primary" data-id='${articleId}' id='savenote'>Save Note</button>
    </div>
  `)

});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/notes/",
    data: {
      // append the articleId to the note so we know which ones are saved to the article
      articleId: thisId,
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
  $("#notesModal").modal('hide');
});

});
