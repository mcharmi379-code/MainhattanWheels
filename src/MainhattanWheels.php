<?php declare(strict_types=1);

namespace MainhattanWheels;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Plugin;
use Shopware\Core\Framework\Plugin\Context\UninstallContext;
use Shopware\Storefront\Framework\ThemeInterface;

class MainhattanWheels extends Plugin implements ThemeInterface
{
    public function uninstall(UninstallContext $uninstallContext): void
    {
        parent::uninstall($uninstallContext);

        // Preserve all merchant configuration when Shopware's "keep user data"
        // option is selected during uninstall.
        if ($uninstallContext->keepUserData()) {
            return;
        }

        $connection = $this->container?->get(Connection::class);
        if (!$connection instanceof Connection) {
            return;
        }

        // Custom field values are translated category data, so remove the value
        // before deleting the field definition and its set.
        $connection->executeStatement(
            "UPDATE category_translation
             SET custom_fields = JSON_REMOVE(custom_fields, '$.mainhattan_flyout_icon')
             WHERE JSON_CONTAINS_PATH(custom_fields, 'one', '$.mainhattan_flyout_icon')"
        );

        // Relations and fields are deleted through the database foreign-key
        // cascade; user-uploaded media is deliberately retained in Media Manager.
        $connection->executeStatement(
            'DELETE FROM custom_field_set WHERE name = :name',
            ['name' => 'mainhattan_flyout_navigation']
        );
    }
}
