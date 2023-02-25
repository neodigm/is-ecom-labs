package com.ltd.atg.util.email.formhandler;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.ServletException;

import atg.droplet.DropletException;
import atg.droplet.DropletFormException;
import atg.droplet.GenericFormHandler;
import atg.repository.RepositoryException;
import atg.service.email.EmailEvent;
import atg.service.email.EmailException;
import atg.servlet.DynamoHttpServletRequest;
import atg.servlet.DynamoHttpServletResponse;
import atg.userprofiling.Profile;

import com.ltd.atg.common.Constants;
import com.ltd.atg.common.utils.StringUtil;
import com.ltd.atg.util.email.Emailer;

public class LTDContactUsFormHandler extends GenericFormHandler {

	public static final String PAYER_ID = "payerID";
	public static final String CURRENT_SITE = "currentSite";

	private String name;
    private String email;
    private String serviceArea;
    private String comments;
    private String payerNumber;
  
    private HashMap<String, String> destinationEmailAddressMap;    
	private String emailSubject;
    private String formStatus;
	
    private Profile currentUser;
    private Emailer emailService;

    public Profile getCurrentUser() {
        return currentUser;
    }

    public void setCurrentUser(Profile currentUser) {
        this.currentUser = currentUser;
    }
    
    public Emailer getEmailService() {
        return emailService;
    }
    
    public void setEmailService(Emailer emailService) {
        this.emailService = emailService;
    }
    
    
    public void preSendContactUsEmail(DynamoHttpServletRequest request, DynamoHttpServletResponse response) throws IOException, ServletException {
		if (isLoggingDebug()) {
            logDebug("LTDContactUsFormHandler :: preSendContactUsEmail is invoked");
            logDebug("Name : "+name);
            logDebug("Email : "+email);
            logDebug("ServiceArea : "+serviceArea);
            logDebug("Comments : "+comments);
        }
		
		//validate the fields
		if (!StringUtil.isBlank(name)) {
			if( name.trim().length() < 2 || name.trim().length() > 19){
				addFormException(new DropletFormException(
		                "Name must contain at least 2 characters and less than 19 characters",
		                "/ltd/util/email/LTDContactUsFormHandler.name","Name must contain at least 2 characters and less than 19 characters"));
			} 
			else if (!StringUtil.isValidName(name.trim()) ) {
	     		addFormException(new DropletFormException("Invalid characters in Name", 
		                "/ltd/util/email/LTDContactUsFormHandler.name","Invalid characters in Name"));
		    }
		}
		else {
				addFormException(new DropletFormException(
	                "Name must contain at least 2 characters and less than 19 characters",
	                "/ltd/util/email/LTDContactUsFormHandler.name","Name must contain at least 2 characters and less than 19 characters"));
		}
		
		if (!StringUtil.isBlank(email)) { 
			if(!StringUtil.isValidEmailAddress(email.trim())) {		
				addFormException(new DropletFormException("Invalid email address",
						"/ltd/util/email/LTDContactUsFormHandler.email","Invalid email address"));
			}
		}
		else {
				addFormException(new DropletFormException("Invalid email address",
						"/ltd/util/email/LTDContactUsFormHandler.email","Invalid email address"));
		}
		
		if (!StringUtil.isBlank(serviceArea)) { 
			if(serviceArea.trim().length()==0) {
    			addFormException(new DropletFormException("service Area is required", 
    					"/ltd/util/email/LTDContactUsFormHandler.serviceArea","service Area is required"));
			}	
		}
		else {
				addFormException(new DropletFormException("service Area is required", 
						"/ltd/util/email/LTDContactUsFormHandler.serviceArea","service Area is required"));
		}
		
		if (!StringUtil.isBlank(comments)) { 
			if (comments.trim().length()==0) {
    			addFormException(new DropletFormException("Comment is required", 
    					"/ltd/util/email/LTDContactUsFormHandler.comments","Comment is required"));
			}
		}
		else {
				addFormException(new DropletFormException("Comment is required", 
						"/ltd/util/email/LTDContactUsFormHandler.comments","Comment is required"));
		}
	       
    }
    

    public boolean handleSendContactUsEmail (DynamoHttpServletRequest request,
        DynamoHttpServletResponse response) throws ServletException, IOException   {

        if (isLoggingDebug()) {
            logDebug("LTDContactUsFormHandler :: handleSendContactUsEmail::invoked");
        }
        
        try {
	        preSendContactUsEmail(request,response);   		
	        if (getFormError()) {
	        	if (isLoggingDebug()) {
	        		logDebug("LTDContactUsFormHandler :: Form Error");
	        	}
	        	response.setHeader("form_status","error");	
	        	setFormStatus("error");
	        	if (isLoggingDebug()) {
		        	logDebug("FormStatus: " + formStatus);
		        }
	        	return true;
	        }
	        
	        Profile currentUser = (Profile) request.resolveName(Constants.COMPONENT_NAME_PROFILE);
	        String payer = (String) currentUser.getPropertyValue(PAYER_ID);
	        if (payer != null)
	        	setPayerNumber(payer);
	        else 
	        	setPayerNumber("");
	        
	        String currentSite = (String) currentUser.getPropertyValue(CURRENT_SITE);
	        String siteId = "LTD";
	        String siteName = "LTD Commodities";
	        if (currentSite.equals(Constants.SITE_LAKESIDE)) {
	        	siteName = "Lakeside";
	            siteId = "LS";
	        }  
	        
	        if (isLoggingDebug()) {
	        	logDebug("Site ID: " + siteId);
	        	logDebug("Site Name: " + siteName);
	        }
	
	        //send email to LTD/Lakeside customer service
	        EmailEvent emailEvent = new EmailEvent();
	        if (isLoggingDebug()) {
	        	logDebug("Email recipient: " + getEmailForSite(siteId));
	        }
	        
	        emailEvent.setRecipient(getEmailForSite(siteId));
	        emailEvent.setSubject(siteName + " - " + serviceArea);
	        emailEvent.setFrom(getEmail());
	        emailEvent.setBody(buildEmailBody());
	       
	        getEmailService().sendEmailEvent(emailEvent);	
	        setFormStatus("success");
	        if (isLoggingDebug()) {
	        	logDebug("FormStatus: " + formStatus);
	        }
	        return true;        
        }
        catch (EmailException eme) {
            logError("LTDContactUsFormHandler :: Exception when sending contactUs email: " + eme.toString());           
            return false;
        }
        catch(Exception ex) {
        	logError("LTDContactUsFormHandler :: Exception in handleSendContactUsEmail - ", ex);			
        	return false;
        }
    }

    /**
     * Build email body based on the form properties.
     * @return email body
     */
    private String buildEmailBody() {
    	
        StringBuffer sb = new StringBuffer();
        
        if (getPayerNumber()!="") {
    		sb.append("\nAccount Number: ").append(getPayerNumber()).append("\n");
    		sb.append("\n");
        }
        sb.append(name).append("\n")
        .append(email).append("\n")
        .append("\nService area: ").append(serviceArea).append("\n")         
        .append("\nComments:\n").append(comments);
        
        if(isLoggingDebug()) {
        	logDebug("Email Body : "+sb.toString());
        }
        return sb.toString();
    }

    private String getEmailForSite ( String siteId ) {
	    return this.getDestinationEmailAddressMap().get(siteId);
	}

    //getters and setters
    
    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}  

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }  

    public String getServiceArea() {
        return serviceArea;
    }
    public void setServiceArea(String serviceArea) {
        this.serviceArea = serviceArea;
    }

    public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getPayerNumber() {
		return payerNumber;	}

	public void setPayerNumber(String payerNumber) {
		this.payerNumber = payerNumber;
	} 
    
    public HashMap<String, String> getDestinationEmailAddressMap() {
		return destinationEmailAddressMap;
	}

	public void setDestinationEmailAddressMap(
			HashMap<String, String> destinationEmailAddressMap) {
		this.destinationEmailAddressMap = destinationEmailAddressMap;
	}

    public String getEmailSubject() {
        return emailSubject;
    }
    
    public void setEmailSubject(String emailSubject) {
        this.emailSubject = emailSubject;
    }

	public String getFormStatus() {
		return formStatus;
	}

	public void setFormStatus(String formStatus) {
		this.formStatus = formStatus;
	}    
    
}

