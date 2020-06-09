import utils from '../node_modules/decentraland-ecs-utils/index'
import * as ERC20 from '../node_modules/decentraland-crypto-utils/erc20/index'


// NFT picture frame
const entity = new Entity()
const shapeComponent = new NFTShape('ethereum://0x06012c8cf97BEaD5deAe237070F9587f8E7A266d/1584275',Color3.Blue())
entity.addComponent(shapeComponent)
entity.addComponent(
  new Transform({
    position: new Vector3(4, 1.5, 4)
  })
)
engine.addEntity(entity)

// Define box
const box = new Entity()
box.addComponent(
  new Transform({
    position: new Vector3(5.75, 1, 3),
    scale: new Vector3(0.5, 0.5, 0.5)
  })
)
box.addComponent(new BoxShape())
engine.addEntity(box)

// Define a material to color the box red
const boxMaterial = new Material()
boxMaterial.albedoColor = Color3.Red()
boxMaterial.metallic = 0.9
boxMaterial.roughness = 0.1

// Assign the material to the box
box.addComponent(boxMaterial)

// Define open and closed positions for box
let boxUp = new Vector3(5.75, 1, 3)
let boxDown = new Vector3(5.75, 5, 3)

//toggle behavior for box
box.addComponent(
  new utils.ToggleComponent(utils.ToggleState.Off, value => {
    if (value == utils.ToggleState.On) {
      box.addComponentOrReplace(
        new utils.MoveTransformComponent(boxUp, boxDown, 1)
      )
    } else {
      box.addComponentOrReplace(
        new utils.MoveTransformComponent(boxDown, boxUp, 1)
      )
    }
  })
)

engine.addEntity(box)

// Set the click behavior for the box

box.addComponent(
  new OnPointerDown(
    e => {
      box.getComponent(utils.ToggleComponent).toggle()
    },
    { button: ActionButton.POINTER, hoverText: 'Bump'}
  )
)


const txt = new Entity()
txt.addComponent(
  new Transform({
    position: new Vector3(6, 3, 3)
  })
)
const myText = new TextShape('Hello World!')
txt.addComponent(myText)

engine.addEntity(txt)

class ContractAddress extends Entity {
  address: string
  constructor(
    address: string
  ) {
    super()
    engine.addEntity(this)
    this.address = address
        

    const addr = new Entity()
    addr.addComponent(
      new Transform({
        position: new Vector3(6, 5, 3)
      })
    )
    const myText = new TextShape(address)
    addr.addComponent(myText)

    engine.addEntity(addr)
  }
}

const address = new ContractAddress('0xe7664229833AE4Abf4E269b8F23a86B657E2338D')

