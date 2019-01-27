;(function () {
  'use strict';
  /* 
    метод для валидации введенных значений в поля формы,
    что по крайне мере не будет отправлена пустая форма
  */
  function validateForm(form) {
    if (form[0].checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      form.addClass('was-validated');
      $('#emptyForm').modal();
      return false;
    }
    form.removeClass('was-validated');
    return true;
  }

  // обработчик для изменения размера полей типа textarea
  $(document).on('input', 'textarea', function () {
    $(this).css('height', 'auto');
    $(this).height(this.scrollHeight);
  });

  $(document).on('submit', '#formFields', function () {
    var form = $(this);
    if (validateForm(form)) {
      // отправка формы на сервер
    }
  });

  // обработчик для "кнопки" Удалить поле
  $(document).on('click', 'a.remove-field', function () {
    // проверяем является ли удаляемый элемент не последним на странице
    if ($('fieldset.mt-3').length > 1) {
      $(this).closest('fieldset.mt-3').remove();
    }
  });

  // обработчик для "кнопки" Добавить поле
  $(document).on('click', 'a.add-field', function () {
    var fields = $('fieldset.mt-3:first').clone();
    // очищаем поле Заголовок поля при клонировании
    fields.find('input[name=fieldHeader]').val('');
    // удаляем элемент содержащий в себе поле для вопросов или placeholder
    fields.find('div.field-input').html('');
    // устанавливаем checkbox Обязательный вопрос на true
    fields.find('input[name=reqQuestion]').prop('checked', true);
    $(fields).appendTo('div.fields_form');
  });

  // обработчик для отслеживания изменения выбора Типа поля
  $(document).on('change', 'select[name=fieldType]', function () {
    var placeholder = $('<input>', {
      type: 'text',
      class: 'field-placeholder mb-3 form-control form-control-sm',
      name: 'placeholder',
      required: ''
    });
    var fieldListQuestions = $('<textarea>', {
      class: 'field-questions mb-3 form-control form-control-sm',
      name: 'fieldListQuestions',
      required: ''
    });

    function removeFieldInput($element) {
      $element.closest('fieldset.mt-3').find('div.field-input').html('');
    }

    function addPlaceholderOrFieldListQuestions($element, type) {
      $($element.closest('fieldset.mt-3').find('div.field-input')).append(type);
    }

    if ($(this).val() === 'choose_type') {
      removeFieldInput($(this));
      return;
    }
    if ($(this).val() === 'text_string' || $(this).val() === 'text_paragraph') {
      removeFieldInput($(this));
      addPlaceholderOrFieldListQuestions($(this), placeholder);
    } else {
      removeFieldInput($(this));
      addPlaceholderOrFieldListQuestions($(this), fieldListQuestions);
    }
  });
}());