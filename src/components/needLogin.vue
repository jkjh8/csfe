<template>
  <q-card
    class="shadow-10 col-12 q-mt-xl"
    style="width: 25rem; border-radius: 2rem;"
  >
    <q-card-section>
      <q-item>
        <q-item-section avatar>
          <q-icon name="svguse:icons.svg#exclamation" size="3rem" color="red"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h6" style="font-weight: 700;">
            사용을 위해서 먼저 로그인이 필요합니다
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-section style="text-align: center;">
      아이디가 없으시면 먼저 <q-btn padding="0" flat color="blue" to="/register">회원가입</q-btn>을 하세요
    </q-card-section>
    <q-card-section class="row justify-center">
      <q-btn padding=".6rem 2rem" rounded unelevated color="grey-10" to="/login">
        <q-icon name="svguse:icons.svg#user"></q-icon>
        <span style="font-family: 나눔고딕; font-weight: 700; font-size: 1rem;">로그인</span>
      </q-btn>
    </q-card-section>
  </q-card>
</template>
