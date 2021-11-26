<?php
    $soapClient = new SoapClient('http://localhost:9999/dorayaki_supplier/dorayakiRequestStatus?wsdl');
    $soapRes = $soapClient->getRequestStatus();
    // echo $soapRes;
    json_encode($soapRes);
    $json = json_encode($soapRes);
    echo $json;
?>