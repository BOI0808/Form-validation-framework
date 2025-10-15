function Validator(formSelector) {
  var formRules = {};
  var validatorRules = {
    required: function (value) {
      return value ? undefined : "Vui lòng nhập trường này";
    },
    email: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "Vui lòng nhập trường này";
    },
    min: function (min) {
      return function (value) {
        return value.length >= min
          ? undefined
          : `Vui lòng nhập ít nhất ${min} kí tự`;
      };
    },
    max: function (max) {
      return function (value) {
        return value.length >= max
          ? undefined
          : `Vui lòng nhập tối đa ${max} kí tự`;
      };
    },
  };

  // Lấy ra form element trong DOM theo "formSelector"
  var formElement = document.querySelector(formSelector);

  // Chỉ xử lý khi có element trong DOM
  if (formElement) {
    var inputs = formElement.querySelectorAll("[name][rules]");
    for (var input of inputs) {
      var rules = input.getAttribute("rules").split("|");

      for (var rule of rules) {
        if (rule.includes(":")) {
          var ruleInfo = rule.split(":");
          rule = ruleInfo[0];
        }

        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(validatorRules[rule]);
        } else {
          formRules[input.name] = [validatorRules[rule]];
        }
      }
    }
    console.log(formRules);
  }
}
