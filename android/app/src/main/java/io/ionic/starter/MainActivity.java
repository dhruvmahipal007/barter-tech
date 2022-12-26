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

    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);

         // Initializes the Bridge
    // this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
    //   // Additional plugins you've installed go here
    //   add(GoogleAuth.class);
    // }});
    registerPlugin(com.getcapacitor.community.stripe.StripePlugin.class);
    registerPlugin(GoogleAuth.class);
    registerPlugin(
      com.getcapacitor.community.facebooklogin.FacebookLogin.class
    );
    }



}
