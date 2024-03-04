import {Application, Assets} from "pixi.js";

import {DragonBonesWidget} from "./Widget";

async function start() {
    let app = new Application({ width: 800, height: 1000 });

    const skeleton = await Assets.load('assets/fox_animatio5_0_ske.json')
    const texJson = await Assets.load('assets/fox_animatio5_0_tex.json')
    const texture = await Assets.load('assets/fox_animatio5_0_tex.png')

    const dragonBonesWidget = new DragonBonesWidget(skeleton, texJson, texture);
    dragonBonesWidget.x = app.view.width / 2;
    dragonBonesWidget.y = app.view.height / 4;

    document.body.appendChild(app.view as any);

    app.stage.addChild(dragonBonesWidget);
}

start();

