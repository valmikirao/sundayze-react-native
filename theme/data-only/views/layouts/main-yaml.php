<?php use yii\helpers\Json ?>
<?php $this->head() ?>
--
some: <?= Json::encode("stri\"n'g {}") ?>