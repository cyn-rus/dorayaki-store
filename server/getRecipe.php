<?php
    $soapClient = new SoapClient('http://localhost:9999/dorayaki_supplier/dorayakiVariantList?wsdl');
    $soapRes = $soapClient->getVariantList();
    json_encode($soapRes);
    $json = json_encode($soapRes);
    echo $json;
?>