module.exports = function swirl({ init, update }) {
  let model = init
  const subscribers = []

  return {
    update(...args) {
      model = update(model, ...args)
      subscribers.forEach(subscriber => subscriber(model))
    },
    subscribe(f) {
      subscribers.push(f)

      return function unsubscribe() {
        subscribers.splice(subscribers.indexOf(f), 1)
      }
    }
  }
}
