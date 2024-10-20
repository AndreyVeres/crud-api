export class UserValidator {
  constructor(field, value) {
    if (!value) {
      throw Error(`Property '${field}' is required`);
    }

    this.value = value;
    this.field = field;
  }

  useRules(rules) {
    this.rules = rules;
    return this;
  }

  validate() {
    const { type, touchBy, itemType } = this.rules;

    if (touchBy === 'typeof') {
      if (typeof this.value !== type) {
        throw Error(`Property '${this.field}' should be of type ${type}`);
      }
    } else {
      if (!(this.value instanceof type)) {
        throw Error(`Property '${this.field}' should be of type ${type.name}`);
      }

      if (Array.isArray(this.value) && itemType) {
        for (let i = 0; i < this.value.length; i++) {
          new UserValidator(this.field + `[${[this.value[i]]}]`, this.value[i])
            .useRules({
              type: itemType,
              touchBy: 'typeof',
            })
            .validate();
        }
      }
    }

    return this.value;
  }
}
