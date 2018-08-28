declare type TButtonState = 'top' | 'left' | 'bottom'
declare const RenaultShowroom: any, ga: any, Lx_model: string, Ga_id: string

(function () {
  // Классификация устройства
  let device = document.documentElement.clientWidth > 1000 ? 'desktop' : 'mobile'
  // Положение кнопки для открытия конфигурация
  let button_state: TButtonState = 'top'
  // Инициализация GA
  ga('create', Ga_id)
  // Базовая ссылка на ресурсы
  const path: string = 'http://5wheel.7rlines.com/'
  // Префикс к наименованиям
  const root: string = 'SRL'
  // Функция для нахождения элементов
  const find = (selector: string) => <HTMLElement>document.querySelector(selector)
  // Функция для нахождения всех элементов
  const find_all = (selector: string) => document.querySelectorAll(selector)
  // Функция для создания элементов
  const create = (tag: string) => document.createElement(tag)
  // Функция для создания текста
  const create_text = (text: string) => document.createTextNode(text)
  // Статья после которой должна быть кнопка
  let $article = find('#content')
  // Изображение на котором должна быть картинка
  let $image = <HTMLImageElement>find('.bigNodeImage,.topArticlesListImage')
  // Означает что первая кнопка загружена
  let button_init: boolean = false
  let app_init: boolean = false
  // Повесить обработчик после загрузки DOM
  document.addEventListener('DOMContentLoaded', () => init())
  // Контейнер для стилей
  const $style = <HTMLStyleElement>create('style')
  // Встраиваем контейнер в head
  document.head.appendChild($style)
  // Обработчик для кнопки "Добавить товар"
  function init() {
    device = document.documentElement.clientWidth > 1000 ? 'desktop' : 'mobile';
    $article = find('#content');
    $image = <HTMLImageElement>find('.bigNodeImage,.topArticlesListImage');

    if (!$image) {
      setTimeout(function () {init();}, 100);
      return false;
    } else {
      if (app_init) return false;
      app_init = true;
    }


    // Создание нового всплывающего окна
    const popup = new Popup
    // Класс описания кнопки инициализации
    class Button {

      private $button = create('button')
      protected 

      constructor(private $root: HTMLElement, public type?: 'image') {
        this.view_init()
        this.style_init()
        this.scene_init()
      }


      view_init(): void {

        this.$button.classList.add(`${root}-button`)

        this.$button.innerHTML = `
          <span class="${root}-logo"></span>
          <span class="${root}-divider"></span>
          <span class="${root}-aligner">
            <span class="${root}-text"></span>
          </span>
          <span class="${root}-arrow"></span>`

        this.type === 'image'

          ? this.$button.classList.add(`${root}-image`)

          : this.$button.classList.add(`${root}-article`)

        if (this.type === 'image') this.$root.style.position = 'relative'

        this.$button.addEventListener('click', this.open)

        this.$root.appendChild(this.$button)

      }

      style_init(): void {

        const size: number = 5 // default 5 (нормально 4 - 6)

        const adaptive_height = (value: number) => // default 6

          `height: ${value}vw; min-height: ${value * (size + 3)}px; max-height: ${value * (size + 4)}px;`

        const styles = `
          
          .${root}-button {
            position: relative;
            border: 1px solid #FECB39;
            background: #FECB39;
            padding: 0 50px 0 10px;
            max-width: calc(100% - .5vw);
            ${adaptive_height(size + 1)}
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .${root}-button .${root}-logo {
            background: url('${path}imgs/renault_logo.svg') 50% 50% transparent no-repeat;
            background-size: contain;
            width: 30vw;
            max-width: ${size * 20 + 1}px;
            ${adaptive_height(size - 1 + 0.32)}
          }

          .${root}-button .${root}-divider {
            background: #ffffff;
            min-width: ${size * 0.6}px;
            width: .5vw;
            max-width: ${size * 1.2}px;
            ${adaptive_height(size - 1 + 0.32)}
            margin: 0 8px;
          }
          .${root}-button .${root}-aligner {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .${root}-button .${root}-text {
            background: url('${path}imgs/renault_text.svg') 50% 80% transparent no-repeat;
            background-size: contain;
            width: 30vw;
            max-width: ${size * 11 + 11}px;
            margin-top: .1vw;
            ${adaptive_height(size - 3 + 0.32)}
          }

          .${root}-button:hover {
            background: #ffffff;
            border-color: #AAA7AB;
          }

          .${root}-button:hover .${root}-divider {
            background: #FECE17;
          }

          .${root}-button .${root}-arrow {
            height: 1px;
            width: 1px;
            position: absolute;
            background: transparent;
            display: inline-block;
            right: 20px;
            top: 50%
          }

          .${root}-button .${root}-arrow:before {
            content: '';
            height: 4px;
            width: 12px;
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            position: absolute;
            background: #000000;
            display: inline-block;
            right: 0;
            top: -5px;
          }

          .${root}-button .${root}-arrow:after {
            content: '';
            height: 4px;
            width: 12px;
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            position: absolute;
            background: #000000;
            display: inline-block;
            right: 0;
            bottom: -4px;
          }
          
          @media(max-width:1000px) {
            
          }
          
          @media(min-width:1000px) {
            .${root}-fluid {
              position: fixed;
              top: 100px;
              left: 0;
              transform: none;
            }  
          }
          
          .target-image {
            position: relative;
          }
        
          .${root}-button.${root}-image {
            position: absolute;
            bottom: 2.5vw;
            left: 1.0vw;
            transform: none;
          }`

        $style.innerHTML += styles

      }

      scene_init() {

        if (!button_init) return button_init = true
        // Обьект для проверки было ли инициализировано ga логирование
        const ga_triggered = { top: false, left: false, bottom: false }

        const ga_trigger = (state?: TButtonState, update?: boolean): void => {
          if (update) button_state = state
          if (ga_triggered[state ? state : button_state]) return null
          ga('send', 'event', {
            eventCategory: 'button',
            eventAction: `show-${button_state}`,
            eventLabel: location.pathname
          })
          ga_triggered[button_state] = true
        }

        ga_trigger('top', true)

        const $article_button = this.type !== 'image' ? this.$button : find(`.${root}-button:not(.${root}-image)`)
        const $image_button = this.type === 'image' ? this.$button : find(`.${root}-button.${root}-image`)
        // Класс для перетекания кнопки в бок
        const fluid: string = `${root}-fluid`

        let image_offset: number = $image.offsetTop + $image_button.offsetTop + $image_button.clientHeight
        let article_offset: number = $article.offsetTop + $article.clientHeight - document.documentElement.clientHeight

        setTimeout(function () {
          image_offset = $image.offsetTop + $image_button.offsetTop + $image_button.clientHeight
          article_offset = $article.offsetTop + $article.clientHeight - document.documentElement.clientHeight
        }, 500);

        let topTrigger: boolean = false
        let bottomTrigger: boolean = true
        let heightDetectionTrigger: boolean = false


        function setButtonPosition(event: Event) {

          if(!heightDetectionTrigger) {
            image_offset = $image.offsetTop + $image_button.offsetTop + $image_button.clientHeight
            article_offset = $article.offsetTop + $article.clientHeight - document.documentElement.clientHeight
            heightDetectionTrigger = true;
          }

          if ($article_button) {
            if (window.pageYOffset < image_offset && topTrigger) {
              $article_button.classList.remove(fluid)
              topTrigger = false
            } else if (window.pageYOffset > image_offset && !topTrigger) {
              ga_trigger('left', true)
              $article_button.classList.add(fluid)
              topTrigger = true
            }
            if (window.pageYOffset > article_offset && bottomTrigger) {
              $article_button.classList.remove(fluid)
              bottomTrigger = false
              ga_trigger('bottom', true)
            } else if (window.pageYOffset < article_offset && !bottomTrigger) {
              $article_button.classList.add(fluid)
              bottomTrigger = true
            }
          }
        }
        window.addEventListener('load', setButtonPosition);
        window.addEventListener('scroll', setButtonPosition);

      }

      open(type?: 'auto' | any) {

        function $upTo(el, tagName) {
          tagName = tagName.toLowerCase();

          if (el.tagName.toLowerCase() == tagName) return el;

          while (el && el.parentNode) {
            el = el.parentNode;
            if (el.tagName && el.tagName.toLowerCase() == tagName) {
              return el;
            }
          }
          return null;
        }

        if (type === 'auto') {
          popup.open('confirm')
        } else {
          popup.open('model')

          let $element = $upTo(type.target, 'button');
          let $elementType = null;
          if ($element.classList.contains(`${root}-image`)) {
            $elementType = 'top';
          } else if ($element.classList.contains(`${root}-fluid`)) {
            $elementType = 'left';
          } else if ($element.classList.contains(`${root}-article`) && !$element.classList.contains(`${root}-fluid`)) {
            $elementType = 'bottom';
          }


          if ($elementType != null) {
            ga('send', 'event', {
              eventCategory: 'button',
              eventAction: `click-${$elementType}`,
              eventLabel: location.pathname
            })
          }

        }
      }

    }

    if ($article !== null) new Button($article)
    if ($image !== null) new Button($image, 'image')

  }
  // Класс описания компонента (Всплывающие окно)
  class Popup {

    private $root = create(`${root}-popup`)
    private $container = create(`${root}-container`)
    private $confirm = create(`${root}-confirm`)
    private $showroom = null
    private $showroom_loaded = false
    public can_auto: boolean = false
    public was_open: boolean = false
    public opened: boolean = false
    public stage: string = 'confirm'

    constructor() {

      const self = this

      ga('send', 'event', {
        eventCategory: 'application',
        eventAction: 'load',
        eventLabel: location.pathname
      })

      RenaultShowroom.push('embed', {
        source: '5koleso',
        vitrine: Lx_model,
        container: `${root}-container`,
        ready: (showroom) => self.$showroom = showroom,
        stat: (type) => ga('send', 'event', {
            eventCategory: 'configurator',
            eventAction: type,
            eventLabel: location.pathname
          })
      })

      this.view_init()
      this.style_init()
      this.auto_open()
    }
    // Инициализация представления
    private view_init(): void {

      const self = this

      self.$root.tabIndex = -1

      self.$root.addEventListener('keydown', (event: KeyboardEvent) => event.key === 'Escape' ? self.close() : null)

      self.$container.classList.add(`${root}-hide`)

      // Элемент "фоновая подложка"
      function $background(): HTMLElement {
        const $bg = create(`${root}-back`)
        $bg.addEventListener('click', self.close.bind(self))
        return $bg
      }

      function $close(): HTMLButtonElement {
        const $close = <HTMLButtonElement>create('button')
        $close.classList.add(`${root}-close`)
        $close.innerHTML = ''
        $close.addEventListener('click', () => self.close())
        return $close
      }


      const
        $buttons = create('div'),
        $accept = <HTMLButtonElement>create('button'),
        $decline = <HTMLButtonElement>create('button'),
        $image = <HTMLImageElement>create('img'),
        text = `Вы хотите открыть конфигурацию для ${capitalize(Lx_model)} ?`

      $image.src = `${path}imgs/models/${Lx_model}.jpg`
      self.$confirm.appendChild($image)

      self.$confirm.classList.add(`${root}-hide`)
      $buttons.classList.add(`${root}-buttons`)

      $accept.innerHTML = 'Узнать конфигурации'
      $accept.classList.add(`${root}-accept`)
      $accept.addEventListener('click', () => self.open('model'))

      $decline.innerHTML = 'Нет, спасибо'
      $decline.classList.add(`${root}-decline`)
      $decline.addEventListener('click', () => self.close())

      self.$confirm.innerHTML += `<p class="${root}-confirm-text">${text}</p>`
      $buttons.appendChild($accept)
      $buttons.appendChild($decline)
      self.$confirm.appendChild($buttons)


      self.$root.appendChild($background())
      self.$root.appendChild($close())
      self.$root.appendChild(self.$confirm)
      self.$root.appendChild(self.$container)
      self.$root.classList.add(`${root}-hide`)
      document.body.appendChild(self.$root)


    }
    // Стили всплывающего окна
    private style_init(): void {
      let isIOS = function() {
        return (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
      };
      let cssRotate = function(deg: '-90deg') {
        return `-webkit-transform: rotate(${deg});
        -moz-transform: rotate(${deg});
        -ms-transform: rotate(${deg});
        -o-transform: rotate(${deg});`;
      };
      let scrollIframe = function() {
        let cssIOS = `overflow-y: auto;`;
        let css= `overflow-y: hidden;left: 5%;right: 5%;top:5%;bottom:5%;`;
        return (isIOS())?cssIOS:css;
      };
      const style = `

        @font-face {
          font-family: 'RenaultLife';
          src: url('${path}fonts/RenaultLife-Bold.eot') format('embedded-opentype'), url('${path}fonts/RenaultLife-Bold.woff') format('woff');
          font-weight: 700;
          font-style: normal;
        }
    
        ${root}-popup {
          position:fixed;
          top:0;
          right:0;
          bottom:0;
          left:0;
          z-index:999;
          display: block;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin:0;
          padding:0;
        }
        ${root}-container {
          position: absolute;
          top: 5px;
          right: 5px;
          bottom: 5px;
          left: 5px;
          box-sizing: border-box;
          padding: 0;
          background: #ffffff;
          outline: none;
          -webkit-overflow-scrolling: touch;
  	      ${scrollIframe()};
        }
        
        ${root}-confirm {
          
        }
        ${root}-container iframe {
          height: 100%;
          width: 100%;
        }
        .${root}-close {
          font-size: 1.5rem;
          padding: 0;
          border: none;
          border-radius: 50%;
          background: #fc3;
          position: absolute;
          right: 1%;
          top: 1%;
          z-index:4; 
          height: 33px;
          line-height: 33px;
          width: 33px;
          text-align: center; 
          vertical-align: top;
        }
        .${root}-close:before {
            content: '';
            background: #000000;
            display: inline-block;
            height: 2px;
            width: 15px;
            ${cssRotate('45deg')};
            position: absolute;
            left: 9px;
            top: 50%;
            margin-top: 0px;
        }
        .${root}-close:after {
            content: '';
            background: #000000;
            display: inline-block;
            height: 2px;
            width: 15px;
            ${cssRotate('-45deg')};
            position: absolute;
            left: 9px;
            top: 50%;
            margin-top: 0px;
        }
        
        .${root}-close:hover { background: #ffde00 }

        .${root}-buttons { display: flex; justify-content: center }

        .${root}-buttons > button {
          padding: .4rem 2rem;
          border: none;
          margin: 1rem .5rem 0;
          cursor: pointer
          font-family: bold 12px RenaultLife }

        .${root}-accept { background: #fc3 }

        .${root}-accept:hover { background: #ffde00 }

        ${root}-confirm {
          position: absolute;
          top: 5px;
          right: 5px;
          left: 5px;
          box-sizing: border-box;
          padding: 20px;
          background: #ffffff;
          outline: none;
          -webkit-overflow-scrolling: touch;
  	      ${scrollIframe()};
  	      bottom: auto;
  	      right: auto;
  	      left: 50%;
  	      top: 50%;
  	      width: 650px;
  	      margin-left: -325px;
  	      margin-top: -253px;
  	      text-align: center;
  	      height: 506px;
        }
        @media(max-width: 670px){
          ${root}-confirm {
            width: 90%;
            left: 5%;
            margin-left: 0;
            height: auto;
          }
        }

        @media(max-height: 526px){
          ${root}-confirm {
            height: auto;
            top: 5%;
            margin-top: 0;
          }
        }
        .${root}-confirm-text {
          width: 100% !important;
          text-align: center !important;
          max-width: initial !important;
          font-size: 16px !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        ${root}-confirm > img {
          width: 600px;
          display: inline-block;
          max-width: 100%;
        }

        ${root}-back {
          position:absolute;
          top:0;left:0;right:0;bottom:0;
          z-index:0;
          background: rgba(0, 0, 0, .5) 
        }
        
        .${root}-hide { display: none !important }`

      $style.innerHTML += style

    }

    auto_open() {

      let timeout: number = 1 * 1000, timer_id: number = null, self = this
      setTimeout(() => this.can_auto = true, timeout)

      window.addEventListener('scroll', (event: Event) => {
        if (!this.can_auto) return null

        if ($article && ($article.offsetTop + $article.clientHeight - document.documentElement.clientHeight) < window.pageYOffset) {
          if (timer_id == null && !self.was_open) {
            timer_id = setTimeout(() => {

              if (self.opened) return null

              self.open('confirm')

            }, timeout)
          }
        }

      })

    }

    new(html_string: string): void {
      this.view(html_string)
      this.open()
    }

    view(html_string: string): void {
      this.$container.innerHTML = html_string
    }

    close(): void {

      this.enableScroll();

      this.opened = false
      document.body.style.overflow = ''
      this.$root.classList.add(`${root}-hide`)
    }

    open(stage?: 'confirm' | 'model'): void {

      const self = this

      if (stage == 'model' && !self.$showroom_loaded) {
        self.$showroom_loaded = true;
        self.$showroom.load();
      }

      this.disableScroll();

      this.opened = true

      if (!this.was_open) this.was_open = true

      if (this.stage !== stage) this.stage = stage

      document.body.style.overflow = 'hidden'
      show(this.$root)

      if (this.stage === 'confirm') {
        hide(this.$container)
        show(this.$confirm)
        ga('send', 'event', {
          eventCategory: 'application',
          eventAction: 'open-suggestion',
          eventLabel: location.pathname
        })
      } else {
        hide(this.$confirm)
        show(this.$container)
        ga('send', 'event', {
          eventCategory: 'open-configurator',
          eventAction: Lx_model,
          eventLabel: location.pathname
        })
      }
      this.$root.focus()
    }

    preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
        e.preventDefault();
      e.returnValue = false;
    }

    preventDefaultForScrollKeys(e) {
      // left: 37, up: 38, right: 39, down: 40,
      // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
      let keysToDisable = {37: 1, 38: 1, 39: 1, 40: 1, 32:1, 33:1, 34:1, 35:1, 36:1};

      if (keysToDisable[e.keyCode]) {
        e = e || window.event;
        if (e.preventDefault)
          e.preventDefault();
        e.returnValue = false;
        return false;
      }
    }

    disableScroll() {
      if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', this.preventDefault, false);
      window.onwheel = this.preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
      window.ontouchmove  = this.preventDefault; // mobile
      document.onkeydown  = this.preventDefaultForScrollKeys;
    }

    enableScroll() {
      if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
      window.onmousewheel = document.onmousewheel = null;
      window.onwheel = null;
      window.ontouchmove = null;
      document.onkeydown = null;
    }

  }

  function show($element: HTMLElement): void {
    $element.classList.remove(`${root}-hide`)
  }

  function hide($element: HTMLElement): void {
    $element.classList.add(`${root}-hide`)
  }

  function capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  init();

})()