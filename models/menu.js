const Sequelize = require('sequelize');
 
class Menu extends Sequelize.Model {

   static init(sequelize) {
 
      return super.init(
         {  
            name: {
               type: Sequelize.STRING(20),
               allowNull: false,
            },
            
         },
         {  // 두번째 객체 인수는 테이블 자체에 대한 설정
            sequelize, /* static init 메서드의 매개변수와 연결되는 옵션으로, db.sequelize 객체를 넣어야 한다. */
            modelName: 'menu', /* 모델 이름을 설정. */
            tableName: 'menu', /* 데이터베이스의 테이블 이름. */
            freezeTableName: true,
            timestamps: false,
            paranoid: false, /* true : deletedAt이라는 컬럼이 생기고 지운 시각이 기록된다. */
            charset: 'utf8', /* 인코딩 */
         }
      );
   }
 
  static associate(db) {
    db.Menu.belongsTo(db.Store, { foreignKey: 'storename', targetKey: 'name'});
  }
  
};
 
module.exports = Menu;