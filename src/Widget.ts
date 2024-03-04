import { HAnchor, VAnchor, WidgetAnchor } from "ui-pixijs";
import { Box } from "ui-pixijs";
import { DragonBonesData } from "dragonbones-pixijs/core/model/DragonBonesData";
import { PixiArmatureDisplay } from "dragonbones-pixijs/pixi/PixiArmatureDisplay";
import { PixiFactory } from "dragonbones-pixijs/pixi/PixiFactory";

export class DragonBonesWidget extends Box {
    protected armatureDisplay: PixiArmatureDisplay;

    constructor(rawData: Object, textureAtlasData: Object, textureAtlas: Object) {
        super();
        this.widgetAnchor = new WidgetAnchor(VAnchor.Center, HAnchor.Center);
        this.buildDragonBonesComponent(rawData, textureAtlasData, textureAtlas);
        this.playDefaultAnimation();
        this.addChild(this.armatureDisplay);
    }

    private buildDragonBonesComponent(rawData: Object, textureAtlasData: Object, textureAtlas: Object): void {
        const dbfactory = PixiFactory.factory;
        dbfactory.parseDragonBonesData(rawData);
        dbfactory.parseTextureAtlasData(textureAtlasData, textureAtlas);
        const allDragonBonesValues = Object.values(dbfactory.getAllDragonBonesData());
        const dragonBonesData: DragonBonesData = allDragonBonesValues.length ? allDragonBonesValues[0] : null;
        if (dragonBonesData == null) {
            throw new Error("DragonBonesData is null.");
        }
        this.armatureDisplay = dbfactory.buildArmatureDisplay(dragonBonesData.armatureNames[0], dragonBonesData.name);
        this.armatureDisplay.y = this.armatureDisplay.getLocalBounds().height / 2;
    }

    private playDefaultAnimation(): void {
        const animationStates: ReadonlyArray<string> = this.armatureDisplay.animation.animationNames;
        const firstAnimationState: string = animationStates.length ? animationStates[0] : null;
        if (firstAnimationState != null) {
            this.armatureDisplay.animation.play(firstAnimationState);
        }
    }

    public play(animationName: string, playTimes?: number): void {
        const animationStates: ReadonlyArray<string> = this.armatureDisplay.animation.animationNames;
        const playAnimationName = animationStates.find(item => item === animationName);
        if (playAnimationName == null) {
            console.error(`Animation: ${animationName} is missing. Please use current animations: ${animationStates}`);
        }
        this.armatureDisplay.animation.play(animationName, playTimes);
    }

    public stop(): void {
        this.armatureDisplay.animation.stop();
    }
}
