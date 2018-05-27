<?php use yii\helpers\Json ?>
<?php use Yii?>
--
_csrfParam: <?= Json::encode(Yii::$app->request->csrfParam) ?>
_csrfToken: <?= Json::encode(Yii::$app->request->csrfToken) ?>