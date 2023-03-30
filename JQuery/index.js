$(function () {
  $("#create").on("submit", function (event) {
    event.preventDefault();
    let value = $(this).find("input").val();
    if (!value) {
      alert("할 일을 입력해주세요.");
    } else {
      if ($("li").length >= 6) {
        alert("삭제 후 입력해주세요.");
      } else {
        $("#todo-list").append(
          `<li>
                <input class='complete' type="checkbox" name="ckbox" />
                <span>${value}</span>
                <button type="button" class ='remove'> ✖ </button>
            </li>`
        );

        $(this).trigger("reset"); // input 초기화
      }
    }
  });

  $("body").on("click", ".complete", function () {
    $('input:checkbox[name="ckbox"]').each(function () {
      if ($(this).is(":checked") == true) {
        // 체크박스 선택되어 있으면 class 추가
        $(this).parent("li").addClass("completed"); // this : 완료
      } else {
        // 체크 선택 안되어있으면 class 삭제
        $(this).parent("li").removeClass("completed");
      }
    });
  });

  $("body").on("click", ".remove", function () {
    $(this).parent("li").remove(); // this: 삭제
  });
});
