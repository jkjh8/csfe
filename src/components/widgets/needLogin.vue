<template>
  <q-card class="card-small">
    <q-card-section class="q-pa-none">
      <div class="backg-gr-bl">
        <div class="card-name-align">
          <div class="card-name-sm">
            <q-icon
              name="svguse:icons.svg#exclamation"
              size="3rem"
              color="red"
            />
            <div>
              사용을 위해서 먼저 로그인이 필요합니다
            </div>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-section style="text-align: center; height: 10rem;">
      아이디가 없으시면 먼저 <q-btn
        padding="0"
        flat
        color="blue"
        to="/register"
      >
        회원가입
      </q-btn>을 하세요
    </q-card-section>

    <q-card-section class="row justify-center">
      <q-btn
        padding=".6rem 2rem"
        rounded
        unelevated
        color="grey-10"
        to="/login"
      >
        <q-icon name="svguse:icons.svg#user" />
        <span style="font-family: 나눔고딕; font-weight: 700; font-size: 1rem;">로그인</span>
      </q-btn>
    </q-card-section>
  </q-card>
</template>
