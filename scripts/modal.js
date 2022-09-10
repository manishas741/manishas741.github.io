$(document).ready(function () {
  // MODAL
  var modalText = {
    dil: {
      title: "TD Cloud Migration",
      tag: "Teradata to cloud migration",
      detail:
        "The Project aims at migrating on-premise teradata applications to Snowflake cloud. A python framwork was build to facilitate this automation of data staging and loading via scheduled batch jobs using automic scheduler.",
      bullets: [],
    },
    crspng: {
      title: "EIS - Insurance",
      tag: "Enterprise Integration Services.",
      detail:
        "Enterprise Integration Services (EIS) aims at creating a scalable solution for for facilitating data accessibility to end users by building a data ingestion mechanism of data obtained via APIs into AWS S3 in near real time.",
      bullets: ["One", "two", "three"],
    },
    userManagement: {
      title: "Ad-Sales",
      tag: "Advertisement analysis for television group",
      detail:
        "Ad Sales project helped ABC group to generate revenue via advertisement by facilitating a data ingestion mechanism by various sources using apache airflow and then modelling this data in snowflake using SQL scripts.",
      bullets: [],
    },
  };

  $("#gallery .button").on("click", function () {
    fillModal(this.id);
    $(".modal-wrap").addClass("visible");
  });

  $(".close").on("click", function () {
    $(".modal-wrap, #modal .button").removeClass("visible");
  });

  $(".mask").on("click", function () {
    $(".modal-wrap, #modal .button").removeClass("visible");
  });

  var carousel = $("#carousel"),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $("#next").click(function () {
    shiftSlide(-1);
  });
  $("#prev").click(function () {
    shiftSlide(1);
  });

  carousel.on("mousedown", function () {
    if (carousel.hasClass("transition")) return;
    dragStart = event.pageX;
    $(this).on("mousemove", function () {
      dragEnd = event.pageX;
      $(this).css("transform", "translateX(" + dragPos() + "px)");
    });
    $(document).on("mouseup", function () {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $(".carousel-wrap, .slide").css("width", slideWidth);
    $(".modal").css("max-width", slideWidth);
    $("#carousel").css("left", slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass("transition")) return;
    dragEnd = dragStart;
    $(document).off("mouseup");
    carousel
      .off("mousemove")
      .addClass("transition")
      .css("transform", "translateX(" + direction * slideWidth + "px)");
    setTimeout(function () {
      if (direction === 1) {
        $(".slide:first").before($(".slide:last"));
      } else if (direction === -1) {
        $(".slide:last").after($(".slide:first"));
      }
      carousel.removeClass("transition");
      carousel.css("transform", "translateX(0px)");
    }, 700);
  }

  function fillModal(id) {
    $("#modal .title").text(modalText[id].title);
    $("#modal .detail").text(modalText[id].detail);
    $("#modal .tag").text(modalText[id].tag);
    let bulletList = $("#modal .bullets");
    modalText[id].bullets.forEach(function (item) {
      bulletList.append("<li>" + item + "</li>");
    });

    if (modalText[id].link)
      $("#modal .button")
        .addClass("visible")
        .parent()
        .attr("href", modalText[id].link);

    $.each($("#modal li"), function (index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($("#modal .slide"), function (index, value) {
      $(this).css({
        background:
          "url('img/slides/" + id + "-" + index + ".jpg') center center/cover",
        backgroundSize: "cover",
      });
    });
  }
});
