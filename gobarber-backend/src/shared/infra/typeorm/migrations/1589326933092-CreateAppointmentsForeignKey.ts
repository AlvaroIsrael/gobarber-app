import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class CreateAppointmentsForeignKey1589326933092 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey('appointments',
      new TableForeignKey({
        name: 'FK_provider_id',
        columnNames: ['provider_id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'FK_provider_id');
  }
}
