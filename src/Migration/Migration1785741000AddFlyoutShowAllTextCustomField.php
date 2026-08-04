<?php declare(strict_types=1);

namespace MainhattanWheels\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;
use Shopware\Core\Framework\Uuid\Uuid;

class Migration1785741000AddFlyoutShowAllTextCustomField extends MigrationStep
{
    private const SET_ID = '1ee5d1192a8944899cb53e3da2c7a001';
    private const FIELD_ID = '1ee5d1192a8944899cb53e3da2c7a004';

    public function getCreationTimestamp(): int
    {
        return 1785741000;
    }

    public function update(Connection $connection): void
    {
        $connection->executeStatement(
            'INSERT IGNORE INTO custom_field (id, set_id, name, type, config, active, allow_customer_write, store_api_aware, created_at)
             VALUES (:id, :setId, :name, :type, :config, 1, 0, 0, NOW(3))',
            [
                'id' => Uuid::fromHexToBytes(self::FIELD_ID),
                'setId' => Uuid::fromHexToBytes(self::SET_ID),
                'name' => 'mainhattan_flyout_show_all_text',
                'type' => 'text',
                'config' => json_encode([
                    'label' => [
                        'en-GB' => 'Show all text',
                        'de-DE' => 'Text für „Alle anzeigen“',
                    ],
                    'placeholder' => [
                        'en-GB' => 'Show all',
                        'de-DE' => 'Alle anzeigen',
                    ],
                    'type' => 'text',
                    'componentName' => 'sw-field',
                    'customFieldType' => 'text',
                    'customFieldPosition' => 2,
                ], JSON_THROW_ON_ERROR),
            ],
            ['id' => \PDO::PARAM_STR, 'setId' => \PDO::PARAM_STR]
        );
    }

    public function updateDestructive(Connection $connection): void
    {
    }
}
