cd ~/Desktop;
ssh -i "ecommerce key pair.pem" ubuntu@ec2-3-135-247-81.us-east-2.compute.amazonaws.com;
sudo -i -u postgres;
psql;