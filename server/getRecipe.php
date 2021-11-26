<?php
    $soapClient = new SoapClient('http://localhost:9999/dorayaki_supplier/dorayakiVariantList?wsdl');
    $soapRes = $soapClient->getVariantList();

    echo json_encode($soapRes);
?>