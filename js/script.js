$(document).ready(function () {

    new WOW().init();

    $('.teachers_slider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#9F2546" class="bi bi-arrow-left-circle slick_arrow-prev" viewBox="0 0 16 16">\n' +
            '  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>\n' +
            '</svg>',
        nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#9F2546" class="bi bi-arrow-right-circle slick_arrow-next" viewBox="0 0 16 16">\n' +
            '  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>\n' +
            '</svg>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    const popup = $(".popup")
    const popup_open = $(".popup-open")
    const popup_link = $(".popup__link")

    popup_open.click(function () {
        popup.css("display", "flex");
    })

    $(".popup__close").click(function () {
        popup.css("display", "none");
    })

    popup_link.click(function (event) {
        $(".table__title").text(event.target.textContent);
    })


    $('.button_post').click(function (e) {
        console.log('Кнопка нажата:', $(this).text());
        e.preventDefault();

        const currentBlock = $(this).closest('.popup__main, .contact, .phone-popup');
        const inputs = currentBlock.find('input');

        $('.text-error').remove();
        inputs.css("border-color", "#9F2546");

        let hasErrors = false;

        inputs.each(function () {
            if (!$(this).val().trim()) {
                $(this).css("border-color", "red");
                $(this).after('<p class="text-error">Заполните поле "' + $(this).attr('placeholder') + '"</p>');
                hasErrors = true;
            }
        });

        console.log('hasErrors:', hasErrors);
        if (hasErrors) {
            console.log('Отправка отменена из-за ошибок');
            return false;
        }

        console.log('Отправляем AJAX запрос');

        $.ajax({
            method: "POST",
            url: "https://testologia.ru/checkout",
            data: {
                name: inputs.eq(0).val(),
                phone: inputs.eq(1).val()
            },
            success: function (response) {
                console.log('Ответ сервера:', response);
                if (response.success === 1) {
                    phone_popup.css("display", "none");
                    $(".order-popup").css("display", "flex");
                    inputs.val('');
                } else {
                    alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
                }
            },
            error: function (xhr, status, error) {
                console.error('Ошибка AJAX:', error);
                alert("Ошибка соединения с сервером");
            }
        });
    });

    const phone_popup = $(".phone-popup")

    $(".button_transparent").click(function () {
        menu.removeClass("open")
        phone_popup.css("display", "flex");
    })

    phone_popup.click(function (e) {
        if (e.target === this) {
            phone_popup.css("display", "none");
        }
    });

    $(".phone-popup__close").click(function () {
        phone_popup.css("display", "none");
    })

    $(".order-popup__close").click(function () {
        $(".order-popup").css("display", "none");
    })

    const menu = $(".menu")
    let empty = true

    $('.burger').click(function () {
        menu.addClass("open")
        if (empty === true) {
            $('.header__list').clone(true).css({
                'display': 'flex',
                'flex-direction': 'column',
                'gap': '20px',
            }).appendTo(menu);
            $('.header__button').clone(true).css({
                'display': 'block',
                'marginTop': '20px',
            }).appendTo(menu);
            empty = false;
        }
    })

    $('.menu__close').click(function () {
        menu.removeClass("open")
    })

    $(".link-to-about").click(function () {
        menu.removeClass("open")
        $("html, body").animate({
            scrollTop: $(".about").offset().top
        }, {
            duration: 370,
            easing: "linear"
        });
    })

    $(".link-to-teachers").click(function () {
        menu.removeClass("open")
        $("html, body").animate({
            scrollTop: $(".teachers").offset().top
        }, {
            duration: 370,
            easing: "linear"
        });
    })

    $(".link-to-courses").click(function () {
        menu.removeClass("open")
        $("html, body").animate({
            scrollTop: $(".courses").offset().top
        }, {
            duration: 370,
            easing: "linear"
        });
    })

    $(".link-to-rooms").click(function () {
        menu.removeClass("open")
        $("html, body").animate({
            scrollTop: $(".rooms").offset().top
        }, {
            duration: 370,
            easing: "linear"
        });
    })
})