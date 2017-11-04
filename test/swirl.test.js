const swirl = require("../src/swirl")

describe("swirl", () => {
  test("it is a functinon", () => {
    expect(typeof swirl).toBe("function")
  })

  test("it updates the model properly", done => {
    const app = swirl({
      model: 0,
      update: model => model + 1
    })

    app.subscribe(model => {
      expect(model).toBe(1)
      done()
    })

    app.update()
  })

  test("it respects unsubscribing to updates", () => {
    const app = swirl({
      model: () => 0,
      update: model => model + 1
    })

    const subscriber = jest.fn()
    const unsubscribe = app.subscribe(subscriber)
    unsubscribe()

    app.update()

    expect(subscriber).not.toHaveBeenCalled()
  })

  test("unsubscribing two time does nothing", () => {
    const app = swirl({
      model: () => 0,
      update: model => model + 1
    })

    const subscriber = jest.fn()
    const unsubscribe = app.subscribe(subscriber)
    unsubscribe()
    unsubscribe()

    app.update()

    expect(subscriber).not.toHaveBeenCalled()
  })
})
