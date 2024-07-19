import { FormGroup } from "@angular/forms";

export class FormGroupHelper {

    static markAsDirty(group: FormGroup) {
        const keysForm = Object.keys(group.controls);
        for (let i = 0; i < keysForm.length; i++) {
            group.get(keysForm[i])?.markAsDirty();
        }
    }

    static disabled(group: FormGroup) {
        const keysForm = Object.keys(group.controls);
        for (let i = 0; i < keysForm.length; i++) {
            group.get(keysForm[i])?.disable();
        }
    }

    static enabled(group: FormGroup) {
        const keysForm = Object.keys(group.controls);
        for (let i = 0; i < keysForm.length; i++) {
            group.get(keysForm[i])?.enable();
        }
    }
}