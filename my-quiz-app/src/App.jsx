import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const questionsData = [
  {
    id: 301,
    question: "A university research laboratory needs to migrate 30 TB of data from an on-premises Windows file server to Amazon FSx for Windows File Server. The laboratory has a 1 Gbps network link that many other departments in the university share. The laboratory wants to implement a data migration service that will maximize the performance of the data transfer. However, the laboratory needs to be able to control the amount of bandwidth that the service uses to minimize the impact on other departments. The data migration must take place within the next 5 days. Which AWS solution will meet these requirements?",
    options: ["A. AWS Snowcone", "B. Amazon FSx File Gateway", "C. AWS DataSync", "D. AWS Transfer Family"],
    answer: "C",
    explanation: "AWS DataSync allows for bandwidth throttling and high-performance data transfer, making it suitable for migrating 30 TB over a shared 1 Gbps link within 5 days."
  },
  {
    id: 302,
    question: "A company wants to create a mobile app that allows users to stream slow-motion video clips on their mobile devices. Currently, the app captures video clips and uploads the video clips in raw format into an Amazon S3 bucket. The app retrieves these video clips directly from the S3 bucket. However, the videos are large in their raw format. Users are experiencing issues with buffering and playback on mobile devices. The company wants to implement solutions to maximize the performance and scalability of the app while minimizing operational overhead. Which combination of solutions will meet these requirements? (Choose two.)",
    options: ["A. Deploy Amazon CloudFront for content delivery and caching.", "B. Use AWS DataSync to replicate the video files across AWS Regions in other S3 buckets.", "C. Use Amazon Elastic Transcoder to convert the video files to more appropriate formats.", "D. Deploy an Auto Scaling group of Amazon EC2 instances in Local Zones for content delivery and caching.", "E. Deploy an Auto Scaling group of Amazon EC2 instances to convert the video files to more appropriate formats."],
    answer: "A, C",
    explanation: "CloudFront improves delivery performance through caching, and Elastic Transcoder optimizes video formats for mobile playback, reducing buffering."
  },
  {
    id: 303,
    question: "A company is launching a new application deployed on an Amazon Elastic Container Service (Amazon ECS) cluster and is using the Fargate launch type for ECS tasks. The company is monitoring CPU and memory usage because it is expecting high traffic to the application upon its launch. However, the company wants to reduce costs when utilization decreases. What should a solutions architect recommend?",
    options: ["A. Use Amazon EC2 Auto Scaling to scale at certain periods based on previous traffic patterns.", "B. Use an AWS Lambda function to scale Amazon ECS based on metric breaches that trigger an Amazon CloudWatch alarm.", "C. Use Amazon EC2 Auto Scaling with simple scaling policies to scale when ECS metric breaches trigger an Amazon CloudWatch alarm.", "D. Use AWS Application Auto Scaling with target tracking policies to scale when ECS metric breaches trigger an Amazon CloudWatch alarm."],
    answer: "D",
    explanation: "Application Auto Scaling with target tracking is the native way to scale ECS Fargate tasks based on actual demand to optimize costs."
  },
  {
    id: 304,
    question: "A company recently created a disaster recovery site in a different AWS Region. The company needs to transfer large amounts of data back and forth between NFS file systems in the two Regions on a periodic basis. Which solution will meet these requirements with the LEAST operational overhead?",
    options: ["A. Use AWS DataSync.", "B. Use AWS Snowball devices.", "C. Set up an SFTP server on Amazon EC2.", "D. Use AWS Database Migration Service (AWS DMS)."],
    answer: "A",
    explanation: "AWS DataSync is designed for efficient, automated data transfer between NFS file systems across regions with minimal management."
  },
  {
    id: 305,
    question: "A company is designing a shared storage solution for a gaming application that is hosted in the AWS Cloud. The company needs the ability to use SMB clients to access data. The solution must be fully managed. Which AWS solution meets these requirements?",
    options: ["A. Create an AWS DataSync task that shares the data as a mountable file system.", "B. Create an Amazon EC2 Windows instance. Install and configure a Windows file share role.", "C. Create an Amazon FSx for Windows File Server file system.", "D. Create an Amazon S3 bucket and mount it to the application server."],
    answer: "C",
    explanation: "Amazon FSx for Windows File Server is a fully managed service that natively supports the SMB protocol."
  },
  {
    id: 306,
    question: "A company wants to run an in-memory database for a latency-sensitive application that runs on Amazon EC2 instances. The application processes more than 100,000 transactions each minute and requires high network throughput. A solutions architect needs to provide a cost effective network design that minimizes data transfer charges. Which solution meets these requirements?",
    options: ["A. Launch all EC2 instances in the same Availability Zone within the same AWS Region. Specify a placement group with cluster strategy.", "B. Launch all EC2 instances in different Availability Zones within the same AWS Region. Specify a placement group with partition strategy.", "C. Deploy an Auto Scaling group to launch EC2 instances in different Availability Zones based on a network utilization target.", "D. Deploy an Auto Scaling group with a step scaling policy to launch EC2 instances in different Availability Zones."],
    answer: "A",
    explanation: "A cluster placement group in a single AZ provides the lowest latency and highest throughput with zero inter-AZ data transfer costs."
  },
  {
    id: 307,
    question: "A company that primarily runs its application servers on premises has decided to migrate to AWS. The company wants to minimize its need to scale its Internet Small Computer Systems Interface (iSCSI) storage on premises. The company wants only its recently accessed data to remain stored locally. Which AWS solution should the company use to meet these requirements?",
    options: ["A. Amazon S3 File Gateway", "B. AWS Storage Gateway Tape Gateway", "C. AWS Storage Gateway Volume Gateway stored volumes", "D. AWS Storage Gateway Volume Gateway cached volumes"],
    answer: "D",
    explanation: "Volume Gateway cached volumes store the primary data in S3 and keep only the frequently accessed data locally."
  },
  {
    id: 308,
    question: "A company has multiple AWS accounts that use consolidated billing. The company runs several active high performance Amazon RDS for Oracle On-Demand DB instances for 90 days. The finance team needs to use the appropriate AWS account to access the Trusted Advisor check recommendations for RDS to reduce costs. Which combination of steps should the finance team take? (Choose two.)",
    options: ["A. Use the Trusted Advisor recommendations from the account where the RDS instances are running.", "B. Use the Trusted Advisor recommendations from the consolidated billing account.", "C. Review the Trusted Advisor check for Amazon RDS Reserved Instance Optimization.", "D. Review the Trusted Advisor check for Amazon RDS Idle DB Instances.", "E. Review the Trusted Advisor check for Amazon Redshift Reserved Node Optimization."],
    answer: "A, D",
    explanation: "Checking specific instance metrics like 'Idle DB Instances' is best done in the member account where the resource is running."
  },
  {
    id: 309,
    question: "A solutions architect needs to optimize storage costs. The solutions architect must identify any Amazon S3 buckets that are no longer being accessed or are rarely accessed. Which solution will accomplish this goal with the LEAST operational overhead?",
    options: ["A. Analyze bucket access patterns by using the S3 Storage Lens dashboard for advanced activity metrics.", "B. Analyze bucket access patterns by using the S3 dashboard in the AWS Management Console.", "C. Turn on the Amazon CloudWatch BucketSizeBytes metric. Analyze patterns using Athena.", "D. Turn on AWS CloudTrail for S3 object monitoring. Analyze logs using CloudWatch Logs."],
    answer: "A",
    explanation: "S3 Storage Lens provides a centralized dashboard with advanced metrics for activity and cost optimization without additional configuration."
  },
  {
    id: 310,
    question: "A company sells datasets via S3 us-east-1 and a web app on EC2. Customers receive an S3 signed URL. Customers are in NA and Europe. The company wants to reduce data transfer costs and maintain performance. What should a solutions architect do?",
    options: ["A. Configure S3 Transfer Acceleration on the existing S3 bucket.", "B. Deploy an Amazon CloudFront distribution with the S3 bucket as origin. Switch to CloudFront signed URLs.", "C. Set up a second S3 bucket in eu-central-1 with Cross-Region Replication.", "D. Modify the web application to enable streaming of the datasets to end users."],
    answer: "B",
    explanation: "CloudFront reduces transfer costs (especially for global users) and improves performance through caching, while signed URLs maintain access control."
  },
  {
    id: 311,
    question: "Web application processing insurance quotes. Quotes must be separated by type, responded within 24h, and not lost. Maximize efficiency and minimize maintenance. Which solution meets these requirements?",
    options: ["A. Multiple Kinesis data streams based on quote type.", "B. AWS Lambda function and SNS topic for each quote type.", "C. Single SNS topic with SQS queues subscribed using message filtering.", "D. Multiple Kinesis Data Firehose delivery streams to OpenSearch."],
    answer: "C",
    explanation: "SNS filtering with SQS queues is highly efficient, decoupled, and ensures no message loss with minimal management."
  },
  {
    id: 312,
    question: "Application on EC2 with multiple EBS volumes. Confiugration and data need nightly backup and recovery in a different Region. Most operationally efficient way?",
    options: ["A. Write a Lambda function to schedule snapshots and copy to another Region.", "B. Create a backup plan using AWS Backup to perform nightly backups and copy to another Region. Add EC2 instances as resources.", "C. Create a backup plan using AWS Backup. Add EBS volumes as resources.", "D. Write a Lambda function to schedule snapshots and copy to a different AZ."],
    answer: "B",
    explanation: "AWS Backup centrally manages instance-level backups (including AMI and EBS) and supports automated cross-region copies."
  },
  {
    id: 313,
    question: "Mobile app, millions of users, watch authorized content. What should a solutions architect recommend?",
    options: ["A. Public S3 bucket with KMS keys.", "B. IPsec VPN between app and AWS.", "C. Use Amazon CloudFront with signed URLs.", "D. AWS Client VPN for content streaming."],
    answer: "C",
    explanation: "CloudFront with signed URLs is the standard scalable way to deliver private content globally."
  },
  {
    id: 314,
    question: "Migrate on-premises MySQL (infrequent access) to AWS. Minimal downtime, no specific instance type selection needed. Recommendation?",
    options: ["A. Amazon Aurora MySQL", "B. Amazon Aurora Serverless for MySQL", "C. Amazon Redshift Spectrum", "D. Amazon RDS for MySQL"],
    answer: "B",
    explanation: "Aurora Serverless is perfect for infrequent access patterns as it scales automatically and you don't manage instance types."
  },
  {
    id: 315,
    question: "Actively scan for vulnerabilities on EC2 instances and send a report. Which solution?",
    options: ["A. Deploy AWS Shield and use Lambda for CloudTrail logging.", "B. Deploy Amazon Macie and Lambda.", "C. Turn on Amazon GuardDuty and deploy agents.", "D. Turn on Amazon Inspector and deploy the agent."],
    answer: "D",
    explanation: "Amazon Inspector is specifically designed for automated vulnerability scanning of EC2 instances."
  },
  {
    id: 316,
    question: "EC2 script polling SQS. Reduce costs while handling growing message volume. Recommendation?",
    options: ["A. Increase the size of the EC2 instance.", "B. Use EventBridge to turn off EC2 when underutilized.", "C. Migrate the script on the EC2 instance to an AWS Lambda function.", "D. Use AWS Systems Manager Run Command on demand."],
    answer: "C",
    explanation: "Lambda scales automatically with the number of messages and eliminates the cost of idle EC2 instances."
  },
  {
    id: 317,
    question: "CSV data in S3. COTS app needs SQL analysis in Redshift/S3 but can't read CSV. Least operational overhead?",
    options: ["A. Create an AWS Glue ETL job to process CSV and store in Redshift.", "B. Python script on EC2 to convert CSV to SQL.", "C. Lambda function and DynamoDB table for ETL.", "D. EventBridge to launch EMR cluster weekly for ETL."],
    answer: "A",
    explanation: "AWS Glue is a serverless ETL service that integrates perfectly with S3 and Redshift with minimal management."
  },
  {
    id: 318,
    question: "Strategy to track and audit inventory and configuration changes (e.g., oversized instances, SG rule changes). (Choose two.)",
    options: ["A. Enable AWS CloudTrail.", "B. Use data lifecycle policies.", "C. Enable AWS Trusted Advisor.", "D. Enable AWS Config.", "E. Use CloudFormation."],
    answer: "A, D",
    explanation: "CloudTrail audits API calls (who did what), and AWS Config tracks resource configuration states over time."
  },
  {
    id: 319,
    question: "Remove all shared SSH keys and provide secure access to EC2 instances. Least administrative overhead?",
    options: ["A. Use AWS Systems Manager Session Manager.", "B. Use AWS STS to generate one-time SSH keys.", "C. Shared SSH access to bastion instances.", "D. Cognito custom authorizer and Lambda."],
    answer: "A",
    explanation: "Session Manager provides secure shell access without needing SSH keys or bastion hosts."
  },
  {
    id: 320,
    question: "Ingest JSON data to EC2 (1 MB/s). Reboot causes data loss. Need near-real-time scalable querying with minimal loss.",
    options: ["A. Publish to Kinesis Data Streams and use Kinesis Data Analytics.", "B. Kinesis Data Firehose with Redshift destination.", "C. Instance store -> Firehose to S3 -> Athena.", "D. EBS volume -> ElastiCache for Redis."],
    answer: "A",
    explanation: "Kinesis Data Streams is durable (minimizing loss), and Data Analytics allows near-real-time querying."
  },
  {
    id: 321,
    question: "Ensure all objects uploaded to an S3 bucket are encrypted using bucket policies.",
    options: ["A. Deny if PutObject doesn't have s3:x-amz-acl header.", "B. Deny if PutObject doesn't have s3:x-amz-acl to private.", "C. Deny if PutObject doesn't have SecureTransport to true.", "D. Update the bucket policy to deny if the PutObject does not have an x-amz-server-side-encryption header set."],
    answer: "D",
    explanation: "Checking the x-amz-server-side-encryption header in the bucket policy enforces that encryption is requested during upload."
  },
  {
    id: 322,
    question: "Mobile app image upload. Generate thumbnail (up to 60s). Asynchronously dispatch requests to tiers. Which solution?",
    options: ["A. Custom Lambda function with S3 trigger.", "B. AWS Step Functions workflow.", "C. Place a message on an Amazon SQS queue for thumbnail generation.", "D. SNS notification topics and subscriptions."],
    answer: "C",
    explanation: "SQS is the standard tool for decoupled, asynchronous request processing between application tiers."
  },
  {
    id: 323,
    question: "Badge readers sending HTTPS access messages. Highly available solution for security team analysis.",
    options: ["A. EC2 instance as HTTPS endpoint, results to S3.", "B. API Gateway endpoint invoking a Lambda function to save to DynamoDB.", "C. Route 53 directing messages to Lambda.", "D. Gateway VPC endpoint for S3 and VPN."],
    answer: "B",
    explanation: "API Gateway + Lambda is serverless, highly available, and easily integrates with DynamoDB for storage."
  },
  {
    id: 324,
    question: "Disaster recovery for on-prem iSCSI (hundreds of TBs). Immediate local access without latency. Least infrastructure change?",
    options: ["A. S3 File Gateway with 10 TB local cache.", "B. Storage Gateway tape gateway.", "C. Storage Gateway Volume Gateway cached volume.", "D. Provision an AWS Storage Gateway Volume Gateway stored volume."],
    answer: "D",
    explanation: "Stored volumes keep the entire dataset locally for zero-latency access while backing it up to AWS."
  },
  {
    id: 325,
    question: "Web app in S3 -> Cognito JWT -> Access protected resources in another S3 bucket. Users unable to access content. Fix?",
    options: ["A. Update the Amazon Cognito identity pool to assume the proper IAM role.", "B. Update the S3 ACL.", "C. Redeploy the application.", "D. Update custom attribute mappings."],
    answer: "A",
    explanation: "Cognito Identity Pools must be configured with an IAM role that has permissions to access the target S3 bucket."
  },
  {
    id: 326,
    question: "Optimizing S3 storage costs. Frequent access for 30 days, then infrequent/inconsistent. Maintain HA. (Choose two.)",
    options: ["A. Move assets to S3 Intelligent-Tiering after 30 days.", "B. Configure an S3 Lifecycle policy to clean up incomplete multipart uploads.", "C. Clean up expired object delete markers.", "D. Move to S3 Standard-IA after 30 days.", "E. Move to S3 One Zone-IA after 30 days."],
    answer: "A, B",
    explanation: "Intelligent-Tiering is best for inconsistent patterns after 30 days. Cleaning incomplete uploads saves hidden costs."
  },
  {
    id: 327,
    question: "Private subnet sensitive data EC2. Access only approved third-party software URLs. Block others.",
    options: ["A. Route outbound traffic to an AWS Network Firewall and configure domain list rules.", "B. Set up AWS WAF web ACL.", "C. Strict inbound/outbound security groups.", "D. ALB in front of EC2 instances."],
    answer: "A",
    explanation: "Network Firewall can filter traffic based on domain names (URLs), which Security Groups and WAF cannot do for outbound VPC traffic."
  },
  {
    id: 328,
    question: "Ecommerce app, sudden increase in sales requests. Static site on S3, API on EC2 behind ALB. Ensure success.",
    options: ["A. CloudFront for dynamic content, increase EC2 count.", "B. CloudFront for static, Auto Scaling group.", "C. CloudFront for dynamic, ElastiCache in front of ALB.", "D. Add an Amazon CloudFront distribution for static content and an Amazon SQS queue for asynchronous processing."],
    answer: "D",
    explanation: "CloudFront offloads static load, and SQS buffers spikes in sales requests for later processing, preventing timeouts."
  },
  {
    id: 329,
    question: "Run regular security scans on EC2, patch on schedule, and report status.",
    options: ["A. Amazon Macie + cron jobs.", "B. GuardDuty + Session Manager.", "C. Detective + EventBridge.", "D. Turn on Amazon Inspector and set up AWS Systems Manager Patch Manager."],
    answer: "D",
    explanation: "Inspector identifies vulnerabilities; Patch Manager automates the actual patching and reporting."
  },
  {
    id: 330,
    question: "Store data on RDS and encrypt at rest.",
    options: ["A. Create a key in AWS KMS and enable encryption for the DB instances.", "B. Store key in Secrets Manager.", "C. ACM certificate for SSL/TLS.", "D. IAM certificate for SSL/TLS."],
    answer: "A",
    explanation: "RDS encryption at rest is achieved using AWS KMS keys."
  },
  {
    id: 331,
    question: "Migrate 20 TB from data center to AWS within 30 days. Bandwidth 15 Mbps (max 70% use).",
    options: ["A. Use AWS Snowball.", "B. Use AWS DataSync.", "C. Use a secure VPN connection.", "D. Use Amazon S3 Transfer Acceleration."],
    answer: "A",
    explanation: "At ~10 Mbps (70% of 15), 20 TB would take over 180 days. Snowball is the only option to meet the 30-day deadline."
  },
  {
    id: 332,
    question: "Secure access to sensitive files on-prem Windows server (capacity low). Access by authorized users only, downloaded securely.",
    options: ["A. EC2 in public subnet with SG limits.", "B. Migrate to Amazon FSx for Windows and configure AWS Client VPN.", "C. S3 private VPC endpoint and signed URLs.", "D. S3 public endpoint and IAM Identity Center."],
    answer: "B",
    explanation: "FSx for Windows maintains SMB/AD compatibility, and Client VPN provides secure access over the internet."
  },
  {
    id: 333,
    question: "Monthly financial calculation batch peaks CPU to 100% and disrupts app. Avoid downtime.",
    options: ["A. CloudFront distribution.", "B. Simple scaling policy based on CPU.", "C. Configure an EC2 Auto Scaling scheduled scaling policy based on the monthly schedule.", "D. Amazon ElastiCache."],
    answer: "C",
    explanation: "Since the peak is predictable (midnight, 1st of month), scheduled scaling ensures capacity is ready before the peak."
  },
  {
    id: 334,
    question: "Allow customer to use on-premises Active Directory to download S3 files via SFTP. Least overhead, no app changes.",
    options: ["A. Set up AWS Transfer Family with SFTP for Amazon S3 and integrated Active Directory.", "B. AWS DMS sync.", "C. AWS DataSync sync.", "D. Windows EC2 SFTP instance."],
    answer: "A",
    explanation: "Transfer Family is a managed service that supports SFTP and AD integration natively."
  },
  {
    id: 335,
    question: "Sudden demand increases. Provision large EC2 from AMI in ASG. Minimum initialization latency.",
    options: ["A. ec2 register-image + Step Functions.", "B. Enable Amazon EBS fast snapshot restore on a snapshot and provision AMI.", "C. DLM lifecycle rules.", "D. EventBridge + AWS Backup."],
    answer: "B",
    explanation: "Fast Snapshot Restore eliminates the latency of first-read data from EBS snapshots, providing minimum initialization time."
  },
  {
    id: 336,
    question: "Aurora MySQL. Database credentials encrypted and rotated every 14 days. Least operational effort?",
    options: ["A. Create a new AWS KMS key and use AWS Secrets Manager with a 14-day rotation.", "B. Systems Manager Parameter Store + Lambda.", "C. KMS encrypted EFS file system + Lambda.", "D. KMS encrypted S3 bucket + Lambda."],
    answer: "A",
    explanation: "Secrets Manager has built-in rotation for RDS/Aurora that is far simpler than custom Lambda solutions."
  },
  {
    id: 337,
    question: "RDS MySQL (1 primary + 5 read replicas). Replicas experience lag during peak. Stored procedures run routinely. Minimize changes.",
    options: ["A. Migrate the database to Amazon Aurora MySQL and use Aurora Replicas.", "B. ElastiCache for Redis cache.", "C. EC2 MySQL cluster.", "D. DynamoDB migration."],
    answer: "A",
    explanation: "Aurora's storage-level replication significantly reduces lag compared to MySQL's binlog-based replication."
  },
  {
    id: 338,
    question: "Disaster recovery for Aurora MySQL platform. Replicate to secondary Region. Most cost-effective?",
    options: ["A. Binary log replication.", "B. Aurora global database with no secondary instance.", "C. AWS DMS replication.", "D. Set up an Aurora global database and specify a minimum of one DB instance in the secondary Region."],
    answer: "D",
    explanation: "Aurora Global Database is built for this; it requires at least one instance in the target region to process replication."
  },
  {
    id: 339,
    question: "Secure embedded credentials for RDS MySQL custom application. Least programming effort?",
    options: ["A. KMS key rotation.", "B. Secrets Manager + custom Lambda.", "C. Store credentials in AWS Secrets Manager and set up native rotation.", "D. Systems Manager Parameter Store."],
    answer: "C",
    explanation: "Using Secrets Manager's native rotation for RDS requires the least custom code."
  },
  {
    id: 340,
    question: "Website architecture vulnerable to SQL injection.",
    options: ["A. Use AWS WAF in front of the ALB.", "B. ALB listener rule fixed response.", "C. AWS Shield Advanced.", "D. Amazon Inspector."],
    answer: "A",
    explanation: "AWS WAF is the specific service for filtering web-layer attacks like SQL injection."
  },
  {
    id: 341,
    question: "S3 data lake + Aurora MySQL operational data. Join in QuickSight. Marketing team needs column-level authorization. Least overhead?",
    options: ["A. EMR ingest to SPICE.", "B. Glue Studio ingest to S3 + IAM.", "C. Glue Elastic Views materialized view.", "D. Use a Lake Formation blueprint to ingest and enforce column-level access control with Athena source."],
    answer: "D",
    explanation: "Lake Formation is designed for centralized fine-grained access control (like column-level) for data lakes."
  },
  {
    id: 342,
    question: "Batch jobs on EC2 ASG. CPU baseline 60%. Need capacity 30 mins before. Automated way, least overhead.",
    options: ["A. Dynamic scaling target value 60%.", "B. Scheduled scaling policy.", "C. Create a predictive scaling policy and set instances to pre-launch 30 minutes before.", "D. EventBridge + Lambda scaling."],
    answer: "C",
    explanation: "Predictive scaling is specifically designed to handle recurring spikes by pre-launching capacity."
  },
  {
    id: 343,
    question: "Disaster recovery design for MySQL on EC2 in private subnet. Include multiple Regions. Least overhead?",
    options: ["A. Standby EC2 in DR region.", "B. RDS Multi-AZ + cross-region read replicas.", "C. Migrate the MySQL database to an Amazon Aurora global database.", "D. S3 Cross-Region Replication of backups."],
    answer: "C",
    explanation: "Aurora Global Database provides the most integrated cross-region DR with the least management overhead for MySQL workloads."
  },
  {
    id: 344,
    question: "Java app SQS parsing messages. Cannot parse > 256 KB. Need up to 50 MB. Fewest code changes?",
    options: ["A. Use the Amazon SQS Extended Client Library for Java.", "B. Amazon EventBridge.", "C. Change SQS limit.", "D. Amazon EFS."],
    answer: "A",
    explanation: "The Extended Client Library handles the offloading to S3 automatically with minimal change to the existing Java logic."
  },
  {
    id: 345,
    question: "Restrict access, serverless, < 100 users, global content, lowest login latency. Most cost-effective?",
    options: ["A. Use Amazon Cognito for authentication and Lambda@Edge for authorization with CloudFront.", "B. Directory Service + Lambda + ALB.", "C. Cognito + Lambda + S3 Transfer Acceleration.", "D. Directory Service + Lambda@Edge + Beanstalk."],
    answer: "A",
    explanation: "Lambda@Edge with CloudFront handles authorization at the edge, providing the lowest latency."
  },
  {
    id: 346,
    question: "NAS array (SMB/NFS shares) migration to S3 with Lifecycle. Maintain same look and feel. Which type of storage gateway?",
    options: ["A. Volume Gateway", "B. Tape Gateway", "C. Amazon FSx File Gateway", "D. Amazon S3 File Gateway"],
    answer: "D",
    explanation: "S3 File Gateway provides an NFS/SMB interface to S3 while letting you use S3 features like Lifecycle policies."
  },
  {
    id: 347,
    question: "Maximize cost savings for EC2 over 3 years. Be able to change family and sizes in 6 months.",
    options: ["A. Compute Savings Plan", "B. EC2 Instance Savings Plan", "C. Zonal Reserved Instances", "D. Standard Reserved Instances"],
    answer: "A",
    explanation: "Compute Savings Plans are the most flexible, allowing changes to instance families, sizes, regions, and even compute types (Fargate/Lambda)."
  },
  {
    id: 348,
    question: "DynamoDB constant/predictable workload. Participants use wearable devices. Forecasted budget limit. Most cost-effective?",
    options: ["A. Use provisioned mode and DynamoDB Standard-IA with Reserved capacity.", "B. Provisioned mode (manual WCU/RCU).", "C. On-demand mode.", "D. On-demand with reserved capacity."],
    answer: "A",
    explanation: "Provisioned capacity with Reserved Capacity is the cheapest for constant workloads. Standard-IA saves more if data is rarely accessed (if implied)."
  },
  {
    id: 349,
    question: "Aurora PostgreSQL database backup sharing with another account in the same Region. KMS customer managed key used.",
    options: ["A. Create database snapshot -> unencrypted snapshot -> share.", "B. Create database snapshot. Add the acquiring company’s AWS account to the KMS key policy. Share the snapshot.", "C. Snapshot with different AWS managed key.", "D. Download/Upload to S3."],
    answer: "B",
    explanation: "Sharing encrypted snapshots requires sharing the custom KMS key with the target account."
  },
  {
    id: 350,
    question: "RDS SQL Server Single-AZ. Needs high availability, auto recovery, and improved report performance (reports slow transactions). (Choose two.)",
    options: ["A. Modify the DB instance from a Single-AZ DB instance to a Multi-AZ deployment.", "B. Snapshot restore.", "C. Create a read replica of the DB instance in a different Availability Zone.", "D. Migrate to RDS Custom.", "E. RDS Proxy."],
    answer: "A, C",
    explanation: "Multi-AZ provides HA and auto-recovery; a read replica offloads reporting traffic from the primary instance."
  }
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentQ = questionsData[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % questionsData.length);
    }, 50);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + questionsData.length) % questionsData.length);
    }, 50);
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col overflow-hidden font-sans text-slate-900 select-none">
      
      {/* Progress Indicator (Shrink-0) */}
      <div className="w-full bg-white px-4 py-1.5 flex items-center justify-between border-b shrink-0 shadow-sm z-10">
        <div className="flex-1 bg-gray-200 h-1 rounded-full mr-4">
          <div 
            className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / questionsData.length) * 100}%` }}
          />
        </div>
        <div className="text-[10px] font-bold text-slate-500 tabular-nums uppercase tracking-tight">
          Progress: {currentIndex + 301} / 350
        </div>
      </div>

      {/* Main Flashcard Container (Flex-1) */}
      <main className="flex-1 relative w-full p-3 md:p-6 flex flex-col items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-2xl h-full perspective-1000">
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className={`relative w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
          >
            {/* FRONT: QUESTION */}
            <div className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-md border border-slate-200 flex flex-col overflow-hidden">
              <div className="px-3 py-1.5 bg-slate-50 border-b flex justify-between shrink-0">
                <span className="text-[9px] font-bold text-blue-800 uppercase tracking-widest">Question #{currentQ.id}</span>
                <span className="text-[9px] font-bold text-slate-400">CLICK TO FLIP</span>
              </div>
              
              {/* Question Content Scrollable */}
              <div 
                className="flex-1 overflow-y-auto p-5 md:p-8 space-y-4 custom-scrollbar bg-white"
                onClick={(e) => e.stopPropagation()} 
              >
                <h2 className="text-base md:text-lg font-bold leading-relaxed text-slate-800">
                  {currentQ.question}
                </h2>
                <div className="space-y-2 pb-4">
                  {currentQ.options.map((opt, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm font-medium text-slate-700">
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BACK: ANSWER */}
            <div className="absolute inset-0 backface-hidden bg-slate-900 rounded-xl shadow-xl flex flex-col text-white rotate-y-180 overflow-hidden">
              <div className="px-3 py-1.5 bg-slate-800 border-b border-slate-700 shrink-0">
                <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest">Verified Solution</span>
              </div>

              {/* Answer Content Scrollable */}
              <div 
                className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar-dark"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-6">
                  <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-1 block">Answer</span>
                  <div className="inline-block bg-orange-600 text-white text-3xl font-black px-8 py-2 rounded-lg">
                    {currentQ.answer}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-2 block">Explanation</span>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-sm leading-relaxed text-slate-200 font-medium italic">
                    {currentQ.explanation}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Navigation (Shrink-0) */}
      <footer className="w-full bg-white border-t p-3 flex gap-3 justify-center shrink-0 shadow-sm z-10">
        <button 
          onClick={handlePrev}
          className="flex-1 max-w-[140px] py-2.5 bg-slate-100 text-slate-700 rounded-lg font-bold text-xs hover:bg-slate-200 active:scale-95 transition-all uppercase tracking-tighter"
        >
          Previous
        </button>
        <button 
          onClick={handleNext}
          className="flex-1 max-w-[140px] py-2.5 bg-blue-600 text-white rounded-lg font-bold text-xs hover:bg-blue-700 active:scale-95 transition-all shadow-md uppercase tracking-tighter"
        >
          Next
        </button>
      </footer>

      {/* Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .backface-hidden { backface-visibility: hidden; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        
        .custom-scrollbar-dark::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }

        @supports (-webkit-touch-callout: none) {
          .h-screen { height: -webkit-fill-available; }
        }
      `}} />
    </div>
  );
};

export default App;