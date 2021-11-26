<?php
    $soapClient = new SoapClient('http://localhost:9999/dorayaki_supplier/dorayakiRequestStatus?wsdl');
    $soapRes = $soapClient->getVariantList();
    echo $soapRes;

?>