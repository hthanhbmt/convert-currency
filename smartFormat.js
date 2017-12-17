(function($) {
  // default options
  var defaults = {
    separator: '.',
    decimalpoint: ',',
    currency: ' đ',
  };
  // function
  function fNumber(el, opt) {
    this.config = $.extend({}, defaults, opt);
    this.el = el;
    this.init();
    return this;
  }

  // set init configurations
  fNumber.prototype.init = function() {
    var $this = this;
    // wrape element, add basic css properties
    $this.el
      .wrap('<span class="wrapper-currency"></div>')
      .after('<input type="hidden" class="convertCurrency" name="'+$this.el.attr('name')+'" value="">').removeAttr('name');

    $($this.el).keydown(function(e) {
      if( e.ctrlKey === true ){
        if( e.keyCode != 86 ){
            e.preventDefault();
        }
      }else if(e.keyCode == 8 || e.keyCode == 9  ){

      }else if( ( e.keyCode < 48 || e.keyCode > 57 ) && (e.keyCode < 96 || e.keyCode > 105)){
          e.preventDefault();
      }
    }); 
    
    $($this.el).keyup(function(e) {
      var temp = $this.el.val().replace(new RegExp(eval('/\\'+$this.config.separator+'/igm')), ''); 
      $('.convertCurrency', $this.el.parent()).val(temp);
      $this.el.val($this.convert(temp));
    }); 

    $this.start();
  };

  fNumber.prototype.start = function() {
    var $this = this;
    if($this.el.val()){
      $('.convertCurrency', $this.el.parent()).val($this.el.val());
      $this.el.val($this.convert($this.el.val()));
    }
  };

  fNumber.prototype.convert = function(number) {
    var $this = this;
    return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1"+ $this.config.separator);
  };

  // plugin
  if (typeof $.smartFormat != "function") {
    $.fn.smartFormat = function(o) {
      this.each(function() {
        new fNumber($(this), o);
      });
      return this;
    };
  } else {
    return this;
  }
})(jQuery);

$(".price").smartFormat();
