var currentDate = document.querySelector("#currentDay");
var anchor = $("#anchor");
var workTimeBlocks = ["8","9","10","11","12","13","14","15","16","17"];
var timeBlocksText = ["8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM"];
var milataryTime = dayjs().format("HH");

function setCurrentDate(){
  var todayDate = dayjs().format("dddd,MMMM D, YYYY h:mm:ss A");
  currentDate.textContent = todayDate;
}
$(function () {
  for (var i = 0; i < workTimeBlocks.length; i++){
    var createBlock = $("<div>");
    createBlock.addClass("row time-block past");
    createBlock.attr({id: workTimeBlocks[i]});
    anchor.append(createBlock);

  var convert = +workTimeBlocks[i]
  var time = dayjs().format("HH");
  if (convert == time){
    createBlock.addClass("present");
    createBlock.removeClass("past future");
  }
  else if (convert >= time){
    createBlock.addClass("future");
    createBlock.removeClass("past present");
  };

  var displayTime = $("<div>");
  displayTime.addClass("col-2 col-md-1 hour text-center py-3");
  displayTime.text(timeBlocksText[i]);
  createBlock.append(displayTime);

  var textBox = $("<textarea>");
  textBox.addClass("col-8 col-md-10 description");
  textBox.attr("rows", "3");
  createBlock.append(textBox);

  var saveBnt = $("<button>");
  saveBnt.addClass("btn saveBtn col-2 col-md-1");
  saveBnt.attr("aria-label", "save");
  createBlock.append(saveBnt);

  var saveBntLogo = $("<i>");
  saveBntLogo.addClass("fas fa-save");
  
  saveBntLogo.attr("aria-hidden", "true");
  saveBnt.append(saveBntLogo);

  saveBnt.on("click", function () {
    var parentTime = $(this).parent().attr("id");
    var typedText = $(this).siblings(".description").val();
    localStorage.setItem(parentTime,typedText);
  });
  
  var oldStuff = workTimeBlocks[i];
  $("#" + oldStuff + " .description").val(localStorage.getItem(oldStuff));
}
setCurrentDate();
setInterval(setCurrentDate, 1000);
});
