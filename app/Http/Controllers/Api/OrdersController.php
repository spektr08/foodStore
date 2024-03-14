<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Validator;

class OrdersController extends Controller
{
   public function show(Order $order) {
      $res = Order::with(['user'])->find($order->id);
      return response()->json($res);
   }

   public function create(Request $request) {
      $validator = Validator::make($request->all(), [
         'products' => 'required',
         'notes' => 'required',
     ]);
  
     if($validator->fails()){
         return $this->sendError('Validation Error.', $validator->errors());       
     }
    
     $order = Order::create([
      'products'=> $request->input('products'),
      'notes' => $request->input('notes'),
      'status' => 'open',
      'user_id' => $request->user()->id
     ]);

     return $this->sendResponse($order, 'order created successfully.');
   }

   public function sendResponse($result, $message)
    {
    	$response = [
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ];


        return response()->json($response, 200);
    }

   public function sendError($error, $errorMessages = [], $code = 404)
   {
      $response = [
           'success' => false,
           'message' => $error,
       ];


       if(!empty($errorMessages)){
           $response['data'] = $errorMessages;
       }


       return response()->json($response, $code);
   }
}
