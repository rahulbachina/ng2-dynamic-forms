import {Validators} from "@angular/forms";
import {
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DynamicFormArrayModel,
    DynamicFormArrayGroupModel
} from "./dynamic-form-array.model";
import {DynamicInputModel} from "../input/dynamic-input.model";

describe("DynamicFormArrayModel test suite", () => {

    describe("default model test suite", () => {

        let defaultModel: DynamicFormArrayModel;
        let config = {
            id: "default",
            initialCount: 3,
            createGroup: () => [new DynamicInputModel({id: "defaultInput"})],
            validator: Validators.required
        };

        beforeEach(() => {
            defaultModel = new DynamicFormArrayModel(config);
        });

        it("tests if default model is correctly initialized", () => {

            expect(defaultModel.initialCount).toBe(config.initialCount);
            expect(defaultModel.size).toBe(defaultModel.initialCount);
            expect(defaultModel.id).toEqual(config.id);
            expect(defaultModel.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_ARRAY);
            expect(defaultModel.asyncValidator).toBeNull();
            expect(defaultModel.validator).toBeDefined();
            expect(defaultModel.createGroup().length).toEqual(1);
            expect(defaultModel.removeGroup).toBeDefined();
        });

        it("should throw when no createGroup function is specified", () => {

            expect(function () {
                new DynamicFormArrayModel({id: "test"});
            }).toThrow(new Error("createGroup function must be specified for DynamicFormArrayModel"));
        });

        it("tests if get function works correctly", () => {

            expect(defaultModel.get(0) instanceof DynamicFormArrayGroupModel).toBe(true);
            expect(defaultModel.get(1) instanceof DynamicFormArrayGroupModel).toBe(true);
        });

        it("should serialize correctly", () => {

            let json = JSON.parse(JSON.stringify(defaultModel));

            expect(json.asyncValidators).toBeUndefined();
            expect(json.id).toEqual(defaultModel.id);
            expect(json.groups.length).toEqual(defaultModel.size);
            expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_ARRAY);
            expect(json.validator).toEqual("required");
            expect(json.validators).toBeUndefined();
        });

    });

});