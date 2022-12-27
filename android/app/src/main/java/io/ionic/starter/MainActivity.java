package io.ionic.starter;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {

    // @Override
    // public void onCreate(Bundle savedInstanceState) {
    //     super.onCreate(savedInstanceState);
    //     registerPlugin(com.getcapacitor.community.stripe.StripePlugin.class);
    // }
<<<<<<< HEAD

=======
    
>>>>>>> f0e60fa07905d38dc9b7b1572da40eabcdcebe35
    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);

         // Initializes the Bridge
    // this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
    //   // Additional plugins you've installed go here
    //   add(GoogleAuth.class);
    // }});
<<<<<<< HEAD
    registerPlugin(com.getcapacitor.community.stripe.StripePlugin.class);
=======
     registerPlugin(com.getcapacitor.community.stripe.StripePlugin.class);
>>>>>>> f0e60fa07905d38dc9b7b1572da40eabcdcebe35
    registerPlugin(GoogleAuth.class);
    registerPlugin(
      com.getcapacitor.community.facebooklogin.FacebookLogin.class
    );
    }



}
