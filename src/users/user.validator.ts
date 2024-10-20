import { Primitive, InstanceType, ValidatorTouchOperator } from 'src/types';

interface UserValidatorRules {
  type?: Primitive;
  instance?: InstanceType;
  touchBy: ValidatorTouchOperator;
  itemType?: Primitive;
}

export class UserValidator<T> {
  private field: string;
  private value: T;
  private rules: UserValidatorRules;

  constructor(field: string, value?: T) {
    if (!value) {
      throw Error(`Property '${field}' is required`);
    }

    this.value = value;
    this.field = field;
  }

  useRules(rules: UserValidatorRules) {
    this.rules = rules;
    return this;
  }

  validate() {
    const { type, touchBy, itemType, instance } = this.rules;

    if (touchBy === 'typeof') {
      if (typeof this.value !== type) {
        throw Error(`Property '${this.field}' should be of type ${type}`);
      }
    } else {
      if (instance && !(this.value instanceof instance)) {
        throw Error(`Property '${this.field}' should be of type ${instance.name}`);
      }

      if (Array.isArray(this.value) && itemType) {
        for (let i = 0; i < this.value.length; i++) {
          new UserValidator(this.field + `[${[this.value[i]]}]`, this.value[i])
            .useRules({
              type: itemType,
              touchBy: ValidatorTouchOperator.TYPE_OF,
            })
            .validate();
        }
      }
    }

    return this.value;
  }
}
