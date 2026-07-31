<?php declare(strict_types=1);

namespace MainhattanWheels\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1785459000ConvertFlyoutIconToMediaField extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1785459000;
    }

    public function update(Connection $connection): void
    {
        $connection->executeStatement(
            'UPDATE custom_field
             SET type = :type, config = :config, updated_at = NOW(3)
             WHERE name = :name',
            [
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
            ]
        );
    }

    public function updateDestructive(Connection $connection): void
    {
    }
}
