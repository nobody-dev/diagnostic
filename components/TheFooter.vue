<template>
  <UiContainer
    :class="$style.container"
    data-test-id="the-footer"
    tag="footer"
  >
    <nav>
      <div :class="$style.content">
        <div :class="$style.column">
          <div :class="$style.title">
            Сервис
          </div>
          <ul :class="$style.footerList">
            <li :class="$style.listItem">
              <a href="https://docdoc.ru/about">О нас</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://vacancy.docdoc.ru/">Вакансии</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://docdoc.ru/about/press">Пресса</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://docdoc.ru/about/team">Команда</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://docdoc.ru/about/contacts">Контакты</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://docdoc.ru/about/faq">FAQ</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://docdoc.ru/reviews">Отзывы о DocDoc</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://docdoc.ru/sitemap">Карта сайта</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://docdoc.ru/offer">Пользовательское соглашение</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://docdoc.ru/#apps_anchor">Мобильное приложение</a>
            </li>
          </ul>
        </div>

        <div :class="$style.column">
          <div :class="$style.title">
            Пациенту
          </div>
          <ul :class="$style.footerList">
            <li :class="$style.listItem">
              <a href="https://docdoc.ru/doctor">Врачи</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://docdoc.ru/clinic">Клиники</a>
            </li>
            <li :class="$style.listItem">
              <a href="/">Диагностика</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://docdoc.ru/service">Услуги</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://docdoc.ru/library">Медицинская библиотека</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://illness.docdoc.ru">Справочник заболеваний</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://docdoc.ru/sitemap/fio">Все врачи</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://docdoc.ru/sitemap/clinic-names">Все клиники</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://docdoc.ru/confidentiality">Конфиденциальность</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://docdoc.ru/agreement">Согласие на обработку персональных данных</a>
            </li>
          </ul>
        </div>

        <div :class="$style.column">
          <div :class="$style.title">
            Врачу и клинике
          </div>
          <ul :class="$style.footerList">
            <li :class="$style.listItem">
              <a href="https://docdoc.ru/lk" rel="nofollow">Личный кабинет</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://docdoc.ru/register" rel="nofollow">Регистрация</a>
            </li>
          </ul>

          <div
            :class="{
              [$style.title]: true,
              [$style.secondSection]: true,
            }"
          >
            Партнерам
          </div>
          <ul :class="$style.footerList">
            <li :class="$style.listItem">
              <a href="https://pk.docdoc.ru" rel="nofollow">Личный кабинет</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://pk.docdoc.ru/affiliate" rel="nofollow">Партнёрская программа</a>
            </li>
            <li :class="$style.listItem">
              <a href="https://sberhealth.ru/sales" rel="nofollow">Юридическим лицам</a>
            </li>
          </ul>
          <div
            :class="[$style.sberbank, $style.hiddenDesktop]"
          >
            <span :class="$style.sberbankLabel">
              Входит в группу компаний
            </span>
            <a
              :class="$style.sberbankLogo"
              target="_blank"
              rel="nofollow"
              href="https://www.sberbank.ru/"
            >
              <SberbankLogo />
            </a>
            <div :class="$style.companyDescription">
              ООО «ДОКДОК» · ОГРН 1167746446780
            </div>
          </div>
        </div>

        <div :class="$style.column">
          <div :class="$style.logoBlock">
            <IconLogo :class="$style.logo" />
            <div :class="$style.email">
              Пишите нам на
              <a href="mailto:info@sberhealth.ru" :class="$style.linkColorOcean">info@sberhealth.ru</a>
            </div>
            <div :class="$style.phone">
              Звоните на
              <a href="tel:84991167820" :class="[$style.linkColorOcean, 'call_phone_7']">8 (499) 116-78-20</a>
            </div>
            <div :class="$style.copyright">
              © sberhealth.ru {{ year }}
            </div>
          </div>
          <div :class="$style.socials">
            <a
              href="https://vk.com/sber.health"
              title="Sberhealth вКонтакте"
              :class="$style.socialLink"
              class="vk"
              target="_blank"
              rel="nofollow"
            >
              <LogoVk />
            </a>
            <a
              href="https://www.facebook.com/sberhealth/"
              title="Sberhealth Facebook"
              :class="$style.socialLink"
              class="fb"
              target="_blank"
              rel="nofollow"
            >
              <LogoFb />
            </a>
            <a
              href="https://www.youtube.com/channel/UCzmp8WzYmly2Dskaf5HuIXg"
              title="Sberhealth YouTube"
              :class="$style.socialLink"
              class="yt"
              target="_blank"
              rel="nofollow"
            >
              <LogoYoutube />
            </a>
          </div>
          <div
            :class="[$style.sberbank, $style.visibleDesktop]"
          >
            <span :class="$style.sberbankLabel">
              Входит в группу компаний
            </span>
            <a
              :class="$style.sberbankLogo"
              target="_blank"
              rel="nofollow"
              href="https://www.sberbank.ru/"
            >
              <SberbankLogo />
            </a>
          </div>
        </div>
      </div>

      <div :class="$style.contentBottom">
        <div :class="$style.infoBlock">
          <AgeIcon :class="$style.ageIcon" />
          Информация, представленная на сайте,
          не может быть использована для постановки диагноза,
          назначения лечения и не заменяет прием врача.
        </div>
        <div :class="$style.column">
          ООО «ДОКДОК»
          <br>
          ОГРН 1167746446780
        </div>
      </div>
    </nav>
  </UiContainer>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import IconLogo from '@/assets/icons/logo.svg'
import SberbankLogo from '@/assets/icons/sberbank-logo.svg'
import LogoVk from '@/assets/icons/logo-vk.svg'
import LogoFb from '@/assets/icons/logo-fb.svg'
import LogoYoutube from '@/assets/icons/logo-youtube.svg'
import AgeIcon from '@/assets/icons/age.svg'
import UiContainer from './UiContainer.vue'

export default defineComponent({
  name: 'TheFooter',

  components: {
    IconLogo,
    LogoVk,
    LogoFb,
    LogoYoutube,
    AgeIcon,
    SberbankLogo,
    UiContainer
  },

  setup () {
    const year = new Date().getFullYear()

    return { year }
  }
})
</script>

<style lang="postcss" module>
.container {
  @apply
    p-2xl
    text-main-steel
    text-xs;
}

.content {
  @apply
    pt-4xl
    block;

  max-width: 1000px;
  margin: 0 auto;
  border-top: 1px solid theme('colors.secondary.frosty');
}

.content-bottom {
  @apply
    hidden
    font-normal;

  max-width: 1000px;
  margin: 0 auto;
}

.title {
  @apply
    text-md
    text-main-deep-blue
    mb-md
    font-semibold;
}

.title.second-section {
  @apply mt-2xl;
}

.footer-list {
  @apply
    mt-sm
    mb-2xl
    ml-none
    mr-none
    flex
    flex-wrap
    p-none;
}

.list-item {
  @apply text-sm;

  &::after {
    @apply
      inline-block
      bg-main-steel
      rounded-full
      align-middle;

    width: 2px;
    height: 2px;
    margin: 0 8px 1px;
    content: "";
  }

  &:last-child {
    @apply mb-none;
  }

  &:last-child::after {
    @apply hidden;
  }
}

.logo {
  @apply mb-lg;

  width: 232px;
  height: 25px;
  margin-left: -6px;
}

.phone,
.email {
  @apply
    text-sm
    mb-sm;
}

.link-color-ocean {
  @apply text-main-ocean;
}

.copyright {
  @apply
    mb-4xl;
}

.sberbank-logo {
  @apply
    mt-md
    block;
}

.socials {
  @apply flex;
}

.social-link {
  @apply
    mr-sm
    w-5xl
    h-5xl
    flex-grow-0
    flex-shrink-0;

  flex-basis: auto;

  &:hover {
    @apply
      bg-secondary-frosty
      rounded-full;
  }
}

.social-link:last-child {
  @apply mr-none;
}

.sberbank {
  @apply
    mb-4xl;
}

.info-block {
  max-width: 590px;
}

.age-icon {
  @apply mr-lg block;

  float: left;
}

.visible-desktop {
  @apply hidden;
}

.company-description {
  @apply mt-md;
}

@screen phone-lg {
  .column {
    @apply mr-lg;
  }

  .copyright {
    @apply mb-none;
  }

  .sberbank-logo {
    margin: 12px 0 0;
  }

  .socials {
    margin: 24px 0 0;
  }
}

@screen tablet {
  .list-item {
    @apply mb-sm;
  }
}

@screen desktop {
  .container {
    padding: 16px 16px 72px;
  }

  .content {
    @apply flex justify-between;
  }

  .content-bottom {
    @apply flex;
  }

  .column:first-child {
    width: 128px;
  }

  .column:nth-child(2),
  .column:nth-child(3) {
    width: 184px;
  }

  .column:last-child {
    @apply
      mr-none
      block;

    width: 235px;
  }

  .footer-list {
    @apply block;
  }

  .list-item::after {
    @apply hidden;
  }

  .copyright {
    @apply mb-2xl;
  }

  .socials {
    @apply mt-none;

    margin-bottom: 56px;
  }

  .sberbank {
    @apply mb-none;
  }

  .hidden-desktop {
    @apply hidden;
  }

  .visible-desktop {
    @apply block;
  }
}
</style>
