package com.twitter.exceptions;

public class FollowException extends Exception{

    private static final long serialVersionUID=1L;

    public FollowException(){
        super("User cannot follow themselves");
    }
}
