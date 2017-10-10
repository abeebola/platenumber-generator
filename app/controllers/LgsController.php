<?php

use \Core\Requests as Requests;
use \Models\Lgs;

class LgsController extends \Core\Controller
{
    public function __construct()
    {

    }

    public function add()
    {
        $res = (new Lgs())->new();

        return sendJsonResponse($res);
    }

    public function all()
    {
        $res = (new Lgs())->all();
        return sendJsonResponse($res);
    }

    public function search()
    {
        $id = Requests::queryStrings()->id;
        if ( ! $id )
            return sendJsonResponse( [
                'msg' => 'Valid ID code missing.',
                'success' => 0
            ] );
        $result = (new Lgs())->search( $id );
        return sendJsonResponse( $result );
    }
}