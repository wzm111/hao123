<template>
  <div class="comment-editor" ref="container" v-show="isShow" v-clickout:[clickCancel]>
    <div class="input-wrapper" :class="{ inline }">
      <input-box
        ref="inputBox"
        :type="inline ? 'text' : 'textarea'"
        content-type="rich"
        :rows="5"
        @focus="onInputFocus"
        @blur="onInputBlur"
        @keyup.enter.ctrl.exact.native="handlerSubmit"
        v-model:inputContent="inputContent"
        :placeholder="'请输入'"
        :focused="showInlineButton"
        class="input-box"
      >
        <div
          v-if="inline"
          :class="['input-append', { hasbg: !showInlineButton }]"
          slot="append"
        >
          <emoji-picker
            ref="emojiPicker"
            trigger-pick="click"
            @activated="inputBoxFocused = true"
            @selected="handlerEmojiSelected"
            picker-position="left"
            :button-text-visible="false"
          ></emoji-picker>
        </div>
      </input-box>
      <transition name="button">
        <div
          @click="handlerSubmit"
          class="submit-button inline"
          :disabled="!inputContent"
          ref="button"
          v-show="showInlineButton && inline"
        >
          {{ buttonText }}
        </div>
      </transition>
    </div>
    <div class="footer-action" v-if="!inline">
      <emoji-picker
        trigger-pick="click"
        @activated="$refs.inputBox.focus()"
        @selected="handlerEmojiSelected"
      ></emoji-picker>
      <span class="submit-tiptext">Ctrl + Enter</span>
      <div
        @click="handlerSubmit"
        class="submit-button"
      >
        {{ buttonText }}
      </div>
      <div
        @click="clickCancel"
        class="submit-button cancel"
      >
        {{ cancelText }}
      </div>
    </div>
  </div>
</template>
<script>
import InputBox from './components/input-box.vue'
import EmojiPicker from './components/emoji-picker.vue'
export default {
  name: 'comment-editor',
  components: { InputBox, EmojiPicker },
  data() {
    return {
      active: false,
      inputContent: '',
      inputBoxFocused: false
    }
  },

  props: {
    buttonText: {
      type: String,
      default: '提交'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    inline: {
      type: Boolean,
      default: false
    },
    submit: {
      type: Function
    },
    isShow: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    showInlineButton() {
      return !!(this.inputBoxFocused || this.inputContent)
    }
  },
  destroyed() {
    document.removeEventListener('click', this.hideButton)
  },
  mounted() {
    document.addEventListener('click', this.hideButton)
  },
  methods: {
    // getInputContent(text) {
    //   this.inputContent = text;
    // },
    clickCancel() {
        this.$emit('update:isShow', false);
    },
    focus() {
      this.$refs.inputBox.focus()
    },
    hideButton(e) {
      if (this.$refs.container.contains(e.target)) {
        return
      }

      if (!this.$refs.container.contains(e.target)) {
        this.inputBoxFocused = false
      }
    },
    onInputFocus(e) {
      this.inputBoxFocused = true
    },
    onInputBlur(e) {
      if (this.$refs.container.contains(e.target)) {
        return
      }

      this.inputBoxFocused = false
    },
    handlerSubmit(e) {
      if (!this.inputContent) {
        return
      }
      this.submit(this.inputContent);
      this.inputContent = '';
      this.$refs.inputBox.removeContent();
      // this.$emit('update:submit', this.inputContent)
    },

    handlerEmojiSelected(e) {
      this.$refs.inputBox.focus()
      const clonedNode = e.target.cloneNode(true)
      clonedNode.style.verticalAlign = 'text-top'
      document.execCommand('insertHTML', false, clonedNode.outerHTML)
    }
  }
}
</script>

<style scoped lang="less">
.comment-editor {
  background-color: #fff;
  border: 20px solid rgba(0, 0, 0, .1);
  box-shadow: 1px 1px 10px rgba(0, 0, 0, .1);
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
  z-index: 99;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
}
.input-wrapper {
  &.inline {
    display: flex;

    .input-box {
      flex: 1;
      margin-right: 14px;
    }
  }

  .input-append {
    width: 30px;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    &.hasbg {
      background: #eee;
    }
  }
}

.footer-action {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.submit-tiptext {
  margin-left: auto;
  margin-right: 4px;
  font-size: 14px;
  color: #ccc;
}

.submit-button {
  align-self: flex-end;
  transition: all 0.2s;
  background: #409eff;
  border-radius: 4px;
  display: inline-block;
  cursor: pointer;
  padding: 6px 10px;
  color: white;
  user-select: none;
  margin-left: 10px;

  &.button-enter,
  &.button-leave-to {
    // zoom:0;
    margin-left: -40px;
    transform: scale(0, 0);
  }

  &[disabled] {
    cursor: not-allowed;
    background: #66b1ff;
  }

  &:hover {
    background: #66b1ff;
  }

  &:not([disabled]):active {
    background: #3a8ee6;
  }
  &.cancel {
    background: #f5f5f5;
    color: #333;
  }
}
</style>
