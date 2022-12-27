import Phaser from "phaser"

let player = undefined
const playerWidth = 32
const playerHeight = 48
let playerFacing = "left"

let jumpTimer = 0
let movementKeys = undefined
let animsInitialized = false

class InitialScene extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    const { load } = this

    load.spritesheet("player", "assets/player.png", {
      frameWidth: playerWidth,
      frameHeight: playerHeight,
    })
  }

  create() {
    const { anims, physics, input } = this

    if (!player) {
      player = physics.add.sprite(playerWidth, playerHeight, "player")
      player.body.velocity.y = 2 ** 20
      player.body.collideWorldBounds = true
      player.body.setSize(playerWidth, playerHeight)
    }

    if (!animsInitialized) {
      anims.create({
        key: "playerGoesLeft",
        frames: anims.generateFrameNames("player", { start: 0, end: 3 }),
        frameRate: 12,
        repeat: -1,
      })
      anims.create({
        key: "playerGoesRight",
        frames: anims.generateFrameNames("player", { start: 5, end: 8 }),
        frameRate: 12,
        repeat: -1,
      })
      animsInitialized = true
    }

    if (!movementKeys) {
      movementKeys = input.keyboard.createCursorKeys()
    }
  }

  update() {
    const { time } = this

    player.body.velocity.x = 0

    if (movementKeys.left.isDown) {
      player.body.velocity.x = -150
      if (playerFacing != "left") {
        player.play("playerGoesLeft")
        playerFacing = "left"
      }
    } else if (movementKeys.right.isDown) {
      player.body.velocity.x = 150
      if (playerFacing != "right") {
        player.play("playerGoesRight")
        playerFacing = "right"
      }
    } else if (playerFacing != "idle") {
      player.stop()

      if (playerFacing == "left") {
        player.setFrame(0)
      } else {
        player.setFrame(5)
      }

      playerFacing = "idle"
    }

    if (
      movementKeys.up.isDown &&
      player.body.onFloor() &&
      time.now > jumpTimer
    ) {
      player.body.velocity.y = -250
      jumpTimer = time.now + 750
    }
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  parent: "game",
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: [InitialScene],
  physics: { default: "arcade", arcade: { gravity: { y: 300 } } },
})
