<script setup lang="ts">
import { computed } from 'vue';
import { getRandomInteger } from '@/shared/utils';
import { c } from '@/localization';

const props = withDefaults(
  defineProps<{
    id: string;
    minAmount: number;
    photosPerItem: number;
    price: number;
    width: number;
    height: number;
    hidePrice?: boolean;
    still?: boolean;
    photoUrl?: string;
    scale?: number;
  }>(),
  {
    scale: 20
  }
);
const randomRotation = props.still ? 0 : getRandomInteger(-5, 5);

const formattedPrice = computed(() => (props.price ? c(props.price) : 'Free'));

const itemStyle = computed(() => {
  return {
    width: `${props.width * props.scale}px`,
    height: `${props.height * props.scale}px`,
    transform: `rotate(${randomRotation}deg)`
  };
});

const getPhotoItemStyles = () => {
  const url = props.photoUrl || 'https://picsum.photos/300/300';

  return {
    height: `${(props.height * props.scale - props.scale * 1.2) / props.photosPerItem}px`,
    backgroundImage: `url("${url}")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  };
};
</script>

<template>
  <div
    :class="[
      'package d-flex position-relative justify-center',
      { 'package--still': still, 'cursor-pointer': !still }
    ]"
  >
    <div
      class="package__item rounded bg-amber position-relative"
      v-for="index in minAmount"
      :key="index"
      :style="itemStyle"
    >
      <div
        class="package__item-photo bg-blue-grey rounded position-relative"
        v-for="photo in photosPerItem"
        :style="getPhotoItemStyles()"
        :key="photo"
      ></div>
      <v-badge
        v-if="!hidePrice && index === 1"
        color="primary"
        :content="formattedPrice"
        class="position-absolute left-0 top-0"
      ></v-badge>

      <v-badge
        v-if="index === minAmount"
        class="package__name position-absolute"
        color="success"
        :content="id"
      ></v-badge>
    </div>
  </div>
</template>

<style scoped lang="scss">
.package {
  transition: all 0.3s ease-in-out;

  &:not(&--still):hover {
    z-index: 5;
    transform: scale(1.1);
  }

  &__name {
    right: 15px;
    bottom: 10px;
  }

  &__item {
    padding-top: 4px;
    box-shadow: rgba(0, 0, 0, 0.5) 0 0 5px;

    &-photo {
      left: 4px;
      width: calc(100% - 8px);
      height: calc(100% - 24px);

      &:not(:first-of-type) {
        margin-top: 4px;
      }
    }
  }
}
</style>
