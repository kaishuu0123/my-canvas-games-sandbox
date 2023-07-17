const message: string = "Hello, World!";

const hello = (message: string): void => {
  writeHTML(message)
}

const writeHTML = (message: string): void => {
  console.log(document.body)
  document.body.innerHTML += `${message}`

  console.log(`${message} を出力しました`)
}

document.addEventListener('DOMContentLoaded', () => {
  hello(message)
})
