'use'
import { ChangeEvent, ClipboardEvent, KeyboardEvent } from "react";

/**
 * @description Для правильной работы необходимо использовать onInput, onKeyDown, onPaste
 */
export default class ClassInputTelHandlers {

  private russianCodeTel = ['7', '8', '9']

  private notANumberReg = /\D/g

  private getNumbersValue = (value: string) => value.replace(this.notANumberReg, '')
  readonly onInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    let formattedValue = '',
      inputValueWithoutMask = this.getNumbersValue(input.value)

    if (!inputValueWithoutMask) {
      return input.value = ''
    }

    if (this.russianCodeTel.indexOf(inputValueWithoutMask[0]) > -1) {
      let firstSimbols = ''
      if (inputValueWithoutMask[0] === '9') {
        inputValueWithoutMask = "7" + inputValueWithoutMask
      }
      firstSimbols = (inputValueWithoutMask[0] === '8') ? "8" : "+7"
      formattedValue = firstSimbols + ' '

      if (inputValueWithoutMask.length > 1) {
        formattedValue += `(${inputValueWithoutMask.substring(1, 4)}`
      }

      if (inputValueWithoutMask.length >= 5) {
        formattedValue += `) ${inputValueWithoutMask.substring(4, 7)}`
      }

      if (inputValueWithoutMask.length >= 8) {
        formattedValue += ` ${inputValueWithoutMask.substring(7, 9)}`
      }

      if (inputValueWithoutMask.length >= 10) {
        formattedValue += ` ${inputValueWithoutMask.substring(9, 11)}`
      }

    } else {
      formattedValue = `+ ${inputValueWithoutMask.substring(0, 16)}`
    }
    input.value = formattedValue
  }

  readonly onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement
    if (e.keyCode === 8 && this.getNumbersValue(input.value).length === 1) {
      input.value = ''
    }
  }

  readonly onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData,
      input = e.target as HTMLInputElement,
      inputValueWithoutMask = this.getNumbersValue(input.value)
    if (pastedData) {
      const pastedValue = pastedData.getData("Text")
      if (this.notANumberReg.test(pastedValue)) {
        input.value = inputValueWithoutMask
      }
    }
  }

} 