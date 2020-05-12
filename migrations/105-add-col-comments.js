'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t)=>{
      return Promise.all([
        queryInterface.addColumn(
          'comments',
          'UserId', {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: 'Users',
              key: 'id'
            }
          }),
          queryInterface.addColumn(
            'comments',
            'postId',{
              allowNull:false,
              type:Sequelize.INTEGER,
              references:{
                model:'posts',
                key:'id'
              }
            }
          )
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t)=>{
      return Promise.all([
        queryInterface.removeColumn('comments','userId'),
        queryInterface.removeColumn('comments','postId')
      ])
    })
  }
};
