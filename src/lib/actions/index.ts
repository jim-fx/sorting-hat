import type Animator from "$lib/animator";
import NameInput from "$lib/elements/NameInput.svelte";
import RandomHouse from "$lib/elements/RandomHouse.svelte";
import SelectHouse from "$lib/elements/SelectHouse.svelte";
import InputRange from "$lib/elements/InputRange.svelte";
import Video from "$lib/elements/Video.svelte";
import { Action } from "./ActionClass";
import { userData } from "$lib/stores";
import { post } from "$lib/client-api";

export default function createActions(anim: Animator): Action {

  Action.anim = anim;

  const rootAction = new Action({ audioFile: "teilnehmen.mp3", text: "So so, du willst also an der Silvesterparty im Dungeon teilnehmen?" })
  rootAction.addEventListener("start", () => {
    anim.params.wiggleMouth = 1;
  })
  rootAction.addEventListener("end", () => {
    anim.params.wiggleMouth = 0;
    anim.params.wiggleEyes = 1;
  })


  const name = new Action({ audioFile: "namen.mp3", text: "Sehr schön, verstanden, jetzt bräuchte ich noch deinen Namen?", element: NameInput })
  name.addEventListener("data", (name: string): void => {
    console.log("Got Name", name);
    userData.update(s => {
      s.name = name;
      return s;
    });
  })
  const dontStartQuiz = new Action({ audioFile: "unterhaltung.mp3", text: "Das ist natürlich auch in Ordnung, damit du aber trotzdem nicht leer ausgehst habe ich hier etwas Unterhaltung für dich:", element: Video })

  const startQuiz = new Action({ audioFile: "exzellenter_gast.mp3", text: "Naja, okay, wenn das sooo ist? Dann werden wir mal schauen... Verstanden, du siehst wie ein exzellenter Gast aus." })


  const whichHouse = new Action({ audioFile: "welches_haus.mp3", text: "Weisst du den schon zu welchem der vier Häuser du gehörst?" })

  whichHouse.addEventListener("data", house => {
    userData.update(s => {
      s.house = house;
      return s;
    });
  })

  const randomHouse = new Action({ audioFile: "random_haus.mp3", text: "Okay, um dass herauszufinden bin ich ja hier. Dann werde ich mal  schauen, hmm, ich sehe Mut, aber auch Intelligenz, oh, und hier ist auch noch Empathie. Schwierige Entscheidung, aber ich denke:", element: RandomHouse });
  randomHouse.addEventListener("start", () => {
    anim.params.wiggleMouth = 1;
  })
  randomHouse.addEventListener("progress", v => {
    if (v > 0.34) {
      anim.params.wiggleRim = 2;
      anim.params.wiggleHat = 2;
      anim.params.wiggleEyes = 1;
    }
  })
  randomHouse.addEventListener("speech-ended", () => {
    anim.params.wiggleMouth = 0;
    anim.params.wiggleHat = 0.2;
    anim.params.wiggleEyes = 0;
    anim.params.wiggleRim = 0.2;
  })
  randomHouse.addEventListener("data", house => {
    userData.update(s => {
      s.house = house;
      return s;
    });
  })


  const selectHouse = new Action({ text: "Wähle nun dein Haus aus:", element: SelectHouse })

  selectHouse.addEventListener("data", house => {
    userData.update(s => {
      s.house = house;
      return s;
    });
  })

  const confidenceArrival = new Action({ audioFile: "sicherheit.mp3", text: "Nun zu letzten Frage, auf einer Skala von 0 bis 10, wie sicher können wir mit deinem Erscheinen rechnen?", element: InputRange })
  confidenceArrival.addEventListener("data", (v) => {
    userData.update(s => {
      s.confidence = v / 10;
      post("api", s);
      return s;
    })

  })

  const finalAction = new Action({ audioFile: "final.mp3", text: "So, das war auch schon alles, wir freuen uns dich am 31.12 willkommen zu heißen, und wünschen dir bis dahin eine schöne Weihnachtszeit." })

  rootAction.addAction("Auf jeden Fall!", name);
  rootAction.addAction("Ne, eher nicht", dontStartQuiz);
  name.addAction(startQuiz)
  startQuiz.addAction(whichHouse)

  whichHouse.addAction("Aber natürlich!", selectHouse)
  whichHouse.addAction("Nein, dass weiß ich noch nicht...", randomHouse)

  randomHouse.addAction(confidenceArrival)
  selectHouse.addAction(confidenceArrival)

  confidenceArrival.addAction(finalAction)



  return rootAction;

}
