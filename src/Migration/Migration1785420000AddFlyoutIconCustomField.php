<?php declare(strict_types=1);

namespace MainhattanWheels\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;
use Shopware\Core\Framework\Uuid\Uuid;

class Migration1785420000AddFlyoutIconCustomField extends MigrationStep
{
    private const SET_ID = '1ee5d1192a8944899cb53e3da2c7a001';
    private const FIELD_ID = '1ee5d1192a8944899cb53e3da2c7a002';
    private const RELATION_ID = '1ee5d1192a8944899cb53e3da2c7a003';

    public function getCreationTimestamp(): int
    {
        return 1785420000;
    }

    public function update(Connection $connection): void
    {
        $setId = Uuid::fromHexToBytes(self::SET_ID);

        $connection->executeStatement(
            'INSERT IGNORE INTO custom_field_set (id, name, config, active, global, position, created_at)
             VALUES (:id, :name, :config, 1, 1, 1, NOW(3))',
            [
                'id' => $setId,
                'name' => 'mainhattan_flyout_navigation',
                'config' => json_encode([
                    'label' => [
                        'en-GB' => 'Flyout navigation',
                        'de-DE' => 'Flyout-Navigation',
                    ],
                ], JSON_THROW_ON_ERROR),
            ],
            ['id' => \PDO::PARAM_STR]
        );

        $connection->executeStatement(
            'INSERT IGNORE INTO custom_field (id, set_id, name, type, config, active, allow_customer_write, store_api_aware, created_at)
             VALUES (:id, :setId, :name, :type, :config, 1, 0, 0, NOW(3))',
            [
                'id' => Uuid::fromHexToBytes(self::FIELD_ID),
                'setId' => $setId,
                'name' => 'mainhattan_flyout_icon',
                'type' => 'text',
                'config' => json_encode([
                    'label' => [
                        'en-GB' => 'Flyout icon',
                        'de-DE' => 'Flyout-Icon',
                    ],
                    'customFieldType' => 'media',
                    'componentName' => 'sw-media-field',
                    'customFieldPosition' => 1,
                ], JSON_THROW_ON_ERROR),
            ],
            ['id' => \PDO::PARAM_STR, 'setId' => \PDO::PARAM_STR]
        );

        $connection->executeStatement(
            'INSERT IGNORE INTO custom_field_set_relation (id, set_id, entity_name, created_at)
             VALUES (:id, :setId, :entityName, NOW(3))',
            [
                'id' => Uuid::fromHexToBytes(self::RELATION_ID),
                'setId' => $setId,
                'entityName' => 'category',
            ],
            ['id' => \PDO::PARAM_STR, 'setId' => \PDO::PARAM_STR]
        );
    }

    public function updateDestructive(Connection $connection): void
    {
    }
}
