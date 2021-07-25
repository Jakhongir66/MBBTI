
const tab1 = $('.tabs-one')
const tab2 = $('.tabs-two')
const tab3 = $('.tabs-three')

const btnTab1 = $('.btn-tab1')
const btnTab2 = $('.btn-tab2')
const btnTab3 = $('.btn-tab3')

btnTab1.click(function () {
  tab1.removeClass('_active')
  tab2.addClass('_active')
})

btnTab2.click(function () {
  tab2.removeClass('_active')
  tab3.addClass('_active')
})

// =======================================================================================================

const headerBtn = $('.header--btn')
const overlayPopup = $('.popup-login-overlay')

const resetPasswordLink = $('#resetPasswordLink')
const sendPassword = $('#sendPassword')
const btnSignBack = $('#btnSignBack')
const signinBtn = $('#signinBtn')
const signinBack2 = $('#signinBack2')
const paymentSuccessBtn = $('#paymentSuccessBtn')
const gotoTestBtn = $('#gotoTestBtn')

const loginPopup = $('.login-popup')
const signinPopup = $('.signin-popup')
const passwordPopup = $('.password-popup')
const successPopup = $('.success-popup')


headerBtn.click(function () {
  loginPopup.removeClass('d-none')
  resetPasswordLink.click(function () {
    loginPopup.addClass('d-none')
    passwordPopup.removeClass('d-none')
  })
})

overlayPopup.click(function (e) {
  if (e.target !== this) {
    return
  }
  $(this).addClass('d-none')
})
// sendPassword.click(function () {
//   // sendPassword.addClass('d-none')
//   successPopup.removeClass('d-none')
// })

btnSignBack.click(function () {
  passwordPopup.addClass('d-none')
  loginPopup.removeClass('d-none')
})

signinBtn.click(function () {
  loginPopup.addClass('d-none')
  signinPopup.removeClass('d-none')
})

signinBack2.click(function () {
  signinPopup.addClass('d-none')
  loginPopup.removeClass('d-none')
})

paymentSuccessBtn.click(function () {
  successPopup.removeClass('d-none')
})

gotoTestBtn.click(function () {
  successPopup.addClass('d-none')
  window.location.href = '../test.html'
})








let isMobile = {
  Android: function () { return navigator.userAgent.match(/Android/i); },
  BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
  iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
  Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
  Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
  any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

let body = document.querySelector('body');
if (isMobile.any()) {
  body.classList.add('touch');
  let arrow = document.querySelectorAll('.arrow');
  for (i = 0; i < arrow.length; i++) {
    // let thisLink = arrow[i].previousElementSibling;
    // let subMenu = arrow[i].nextElementSibling;
    let subMenu2 = arrow[i].parentElement.nextElementSibling
    let subMenu3 = arrow[i].parentElement.children[2]
    let thisArrow = arrow[i];

    // subMenu.classList.add('_submenu');
    arrow[i].addEventListener('click', function () {
      subMenu3?.classList.toggle('open');
      subMenu2?.classList.toggle('open');
      thisArrow?.classList.toggle('_active');
    });
  }
} else {
  body.classList.add('mouse');
}

$('.menu__item--arrow').on('click', function () {
  $('.leave').css({
    'opacity': 1,
    'z-index': 99
  })
  // $('.card').toggle('open2')
  $('.menu__item-first').addClass('hide')
});
$('.leave').on('click', function (e) {
  e.preventDefault()
  $(this).css({
    'opacity': 0,
    'z-index': -5
  })
  $('.card').removeClass('open')
  $('.menu__item-first').removeClass('hide')
})


// ==========================================
$(".icon-menu").click(function (event) {
  event.preventDefault();
  $(this).toggleClass("_active");
  $(".menu").toggleClass("_active");
  $("body").toggleClass("_lock");
});

$('nav ul li a').on('click', function () {
  $("body").removeClass("_lock");
})


// =======================================================================================================

// _ibg
function _ibg() {
  $.each($("._ibg"), function (index, val) {
    if ($(this).find("img").length > 0) {
      $(this).css(
        "background-image",
        'url("' + $(this).find("img").attr("src") + '")'
      );
    }
  });
}
_ibg();

// =======================================================================================================

(function () {
  let original_positions = [];
  let da_elements = document.querySelectorAll("[data-da]");
  let da_elements_array = [];
  let da_match_media = [];
  // Заполняем массивы
  if (da_elements.length > 0) {
    let number = 0;
    for (let index = 0; index < da_elements.length; index++) {
      const da_element = da_elements[index];
      const da_move = da_element.getAttribute("data-da");
      const da_array = da_move.split(",");
      if (da_array.length == 3) {
        da_element.setAttribute("data-da-index", number);
        // Zapolnyaem massiv pervonachalniy pozitsii
        original_positions[number] = {
          parent: da_element.parentNode,
          index: index_in_parent(da_element),
        };
        // Zapolnyaem massiv elementov
        da_elements_array[number] = {
          element: da_element,
          destination: document.querySelector("." + da_array[0].trim()),
          place: da_array[1].trim(),
          breakpoint: da_array[2].trim(),
        };
        number++;
      }
    }
    dynamic_adapt_sort(da_elements_array);

    // Sozdaem sobitia v tochke brekpointa
    for (let index = 0; index < da_elements_array.length; index++) {
      const el = da_elements_array[index];
      const da_breakpont = el.breakpoint;
      const da_type = "max"; // Dlya MobileFirst pomenyat na min

      da_match_media.push(
        window.matchMedia("(" + da_type + "-width: " + da_breakpont + "px)")
      );
      da_match_media[index].addListener(dynamic_adapt);
    }
  }
  // Osnovnaya funksiya
  function dynamic_adapt(e) {
    for (let index = 0; index < da_elements_array.length; index++) {
      const el = da_elements_array[index];
      const da_element = el.element;
      const da_destination = el.destination;
      const da_place = el.place;
      const da_breakpont = el.breakpoint;
      const da_classname = "_dynamic_adapt_" + da_breakpont;

      if (da_match_media[index].matches) {
        // Perebrasivaem elementi
        if (!da_element.classList.contains(da_classname)) {
          let actual_index;
          if (da_place == "first") {
            actual_index = index_of_elements(da_destination)[0];
          } else if (da_place == "last") {
            actual_index = index_of_elements(da_destination)[
              index_of_elements(da_destination).length
            ];
          } else {
            actual_index = index_of_elements(da_destination)[da_place];
          }
          da_destination.insertBefore(
            da_element,
            da_destination.children[actual_index]
          );
          da_element.classList.add(da_classname);
        }
      } else {
        // Vozvrashaet na mesto
        if (da_element.classList.contains(da_classname)) {
          dynamic_adapt_back(da_element);
          da_element.classList.remove(da_classname);
        }
      }
    }
    custom_adapt();
  }

  // Vizov osnovnoi funksii
  dynamic_adapt();

  // Funksia vozvrat na mesto
  function dynamic_adapt_back(el) {
    const da_index = el.getAttribute("data-da-index");
    const original_place = original_positions[da_index];
    const parent_place = original_place["parent"];
    const index_place = original_place["index"];
    const actual_index = index_of_elements(parent_place, true)[index_place];
    parent_place.insertBefore(el, parent_place.children[actual_index]);
  }
  // Funksia polucheniya indeksa vnutri roditelya
  function index_in_parent(el) {
    let children = Array.prototype.slice.call(el.parentNode.children);
    return children.indexOf(el);
  }
  // Funksia polucheniya massiva indeksov elementov vnutri roditelya
  function index_of_elements(parent, back) {
    const children = parent.children;
    const children_array = [];
    for (let i = 0; i < children.length; i++) {
      const children_element = children[i];
      if (back) {
        children_array.push(i);
      } else {
        // Isklyuchaya perenesenniy element
        if (children_element.getAttribute("data-da") == null) {
          children_array.push(i);
        }
      }
    }
    return children_array;
  }
  // Sortirovka obekta
  function dynamic_adapt_sort(arr) {
    arr.sort(function (a, b) {
      if (a.breakpoint > b.breakpoint) {
        return -1;
      } else {
        return 1;
      } // Dlya MobileFirst pomenyat
    });
    arr.sort(function (a, b) {
      if (a.place > b.place) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  // Dopolnitelniy senarii adaptatsii
  function custom_adapt() {
    const viewport_width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
  }

  // Слушаем изменение размера экрана ---- <<>>
})();


