$('#summernote').summernote({
  placeholder: '',
  tabsize: 2,
  // 에디터 높이
  height: 450,
  // 에디터 한글 설정
  lang: 'ko-KR',
  // 에디터에 커서 이동 (input창의 autofocus라고 생각하시면 됩니다.)
  focus: true,
  toolbar: [
    // 글꼴 설정
    ['fontname', ['fontname']],
    // 글자 크기 설정
    ['fontsize', ['fontsize']],
    // 굵기, 기울임꼴, 밑줄,취소 선, 서식지우기
    ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
    // 글자색
    ['color', ['forecolor', 'color']],
    // 표만들기
    ['table', ['table']],
    // 글머리 기호, 번호매기기, 문단정렬
    ['para', ['ul', 'ol', 'paragraph']],
    // 줄간격
    ['height', ['height']],
    // 링크첨부
    ['insert', ['link']],
  ],
  // 추가한 폰트사이즈
  fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '30', '36', '50', '72'],
});

function validateMyForm() {
  $('textarea[name="content"]').html($('.summernote').code());
  alert('validations passed');
  return true;
}
