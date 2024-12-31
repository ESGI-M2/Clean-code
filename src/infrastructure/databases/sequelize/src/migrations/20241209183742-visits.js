'use strict';

const TABLE_NAME = 'visits';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      bike_id: {
        type: Sequelize.INTEGER,
        references: { model: 'bikes', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      visit_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL,
      },
      recapitulation: {
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
