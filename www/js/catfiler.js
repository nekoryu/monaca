$(function(){
    console.log("1");
    initEvents();
});
function initEvents()
{
    $('#todo-list li').on('click', function(){
        //console.log('clicked.');
        $('#path').val($('#path').val() + $(this).text());
        sendPath();
    });
}
var onReady = false;
function sendPath()
{
    event.preventDefault();
    //alert("sent.");
    window.resolveLocalFileSystemURL('file://'+$('#path').val(), function (dirEntry)
    {
        console.log('file system open: ' + dirEntry.name);
        //var isAppend = true;
        //createFile(dirEntry, "fileToAppend.txt", isAppend);

        // Get a directory reader
        var directoryReader = dirEntry.createReader();
        
        // Get a list of all the entries in the directory
        directoryReader.readEntries(success,fail);
        
    }, onErrorLoadFs);
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady()
{
    onReady = true;
}
function onErrorLoadFs()
{
    console.log('onErrorLoadFs');
    alert('load error.');
}

function success(entries)
{
    console.log('success');
    var i;
    $("#todo-list").text('');
    for (i=0; i<entries.length; i++)
    {
        console.log(entries[i].name);
        $.mobile.changePage($("#list-page"));
        $("#todo-list").append("<li>" +entries[i].name+ "</li>")
    }
    $("#todo-list").listview('refresh');
    initEvents();
}

function fail(error)
{
    console.log('fail');
    alert("Failed to list directory contents: " + error.code);
}

