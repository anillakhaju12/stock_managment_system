var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
let User = class User extends Model {
};
__decorate([
    Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false
    }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
User = __decorate([
    Table({
        tableName: 'users',
        modelName: 'Users',
        timestamps: true
    })
], User);
export default User;
//# sourceMappingURL=userModel.js.map